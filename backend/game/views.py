from rest_framework import viewsets

from .models import NodeType, Upgrade
from .serializers import NodeTypeSerializer, UpgradeSerializer


class NodeTypeViewSet(viewsets.ModelViewSet):
    queryset = NodeType.objects.order_by('base_cost')
    serializer_class = NodeTypeSerializer


class UpgradeViewSet(viewsets.ModelViewSet):
    queryset = Upgrade.objects.order_by('cost')
    serializer_class = UpgradeSerializer
