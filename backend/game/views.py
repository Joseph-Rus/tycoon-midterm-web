from decimal import Decimal

from django.db import IntegrityError, transaction
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import NodeType, OwnedNode, Player, Upgrade
from .permissions import IsAdminOrReadOnly
from .serializers import NodeTypeSerializer, PlayerSerializer, RegisterSerializer, UpgradeSerializer

CLICK_VALUE = Decimal('1')


def load_player(user, lock=False):
    # prefetch everything income_per_second() needs so it doesn't run a query per node
    players = Player.objects.select_related('user').prefetch_related('nodes__node_type', 'upgrades')
    if lock:
        # lock the player row so two requests can't spend the same money
        players = players.select_for_update()
    player, _ = players.get_or_create(user=user)
    return player


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try:
        with transaction.atomic():
            user = serializer.save()
            token = Token.objects.create(user=user)
    except IntegrityError:
        # two people signed up with the same name at the same time
        return Response({'username': ['That username is already taken.']}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'token': token.key}, status=status.HTTP_201_CREATED)


class PlayerViewSet(viewsets.ViewSet):
    def list(self, request):
        with transaction.atomic():
            player = load_player(request.user, lock=True)
            player.collect()
            player.save()
        return Response(PlayerSerializer(player).data)

    @action(detail=False, methods=['post'])
    def click(self, request):
        with transaction.atomic():
            player = load_player(request.user, lock=True)
            player.collect()
            player.balance += CLICK_VALUE
            player.save()
        return Response(PlayerSerializer(player).data)


class NodeTypeViewSet(viewsets.ModelViewSet):
    queryset = NodeType.objects.order_by('base_cost')
    serializer_class = NodeTypeSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def buy(self, request, pk=None):
        node_type = self.get_object()
        with transaction.atomic():
            player = load_player(request.user, lock=True)
            # collect first so money earned at the old rate isn't lost
            player.collect()
            owned, _ = OwnedNode.objects.get_or_create(player=player, node_type=node_type)
            price = node_type.price_for(owned.quantity)
            if player.balance < price:
                # raising inside atomic() rolls everything back
                raise ValidationError({'detail': 'Not enough money.'})
            player.balance -= price
            player.save()
            owned.quantity += 1
            owned.save()
        return Response(PlayerSerializer(load_player(request.user)).data)


class UpgradeViewSet(viewsets.ModelViewSet):
    queryset = Upgrade.objects.order_by('cost')
    serializer_class = UpgradeSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def buy(self, request, pk=None):
        upgrade = self.get_object()
        with transaction.atomic():
            player = load_player(request.user, lock=True)
            player.collect()
            if upgrade in player.upgrades.all():
                raise ValidationError({'detail': 'You already own this upgrade.'})
            if player.balance < upgrade.cost:
                raise ValidationError({'detail': 'Not enough money.'})
            player.balance -= upgrade.cost
            player.save()
            player.upgrades.add(upgrade)
        return Response(PlayerSerializer(load_player(request.user)).data)
