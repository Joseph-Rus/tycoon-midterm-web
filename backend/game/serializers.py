from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import NodeType, OwnedNode, Player, Upgrade


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Player.objects.create(user=user)
        return user


class NodeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeType
        fields = ['id', 'name', 'base_cost', 'base_income']


class UpgradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upgrade
        fields = ['id', 'name', 'node_type', 'cost', 'multiplier']


class OwnedNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnedNode
        fields = ['node_type', 'quantity']


class PlayerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    income_per_second = serializers.DecimalField(max_digits=20, decimal_places=2, read_only=True)
    nodes = OwnedNodeSerializer(many=True, read_only=True)

    class Meta:
        model = Player
        fields = ['username', 'balance', 'income_per_second', 'last_collected', 'nodes', 'upgrades']
        read_only_fields = fields
