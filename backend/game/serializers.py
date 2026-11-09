from rest_framework import serializers

from .models import NodeType, Upgrade


class NodeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeType
        fields = ['id', 'name', 'base_cost', 'base_income']


class UpgradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upgrade
        fields = ['id', 'name', 'node_type', 'cost', 'multiplier']
