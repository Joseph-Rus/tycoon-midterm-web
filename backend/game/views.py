from django.db import IntegrityError, transaction
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import NodeType, Upgrade
from .permissions import IsAdminOrReadOnly
from .serializers import NodeTypeSerializer, RegisterSerializer, UpgradeSerializer


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


class NodeTypeViewSet(viewsets.ModelViewSet):
    queryset = NodeType.objects.order_by('base_cost')
    serializer_class = NodeTypeSerializer
    permission_classes = [IsAdminOrReadOnly]


class UpgradeViewSet(viewsets.ModelViewSet):
    queryset = Upgrade.objects.order_by('cost')
    serializer_class = UpgradeSerializer
    permission_classes = [IsAdminOrReadOnly]
