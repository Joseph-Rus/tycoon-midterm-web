from django.contrib import admin

from .models import NodeType, OwnedNode, Player, Upgrade


@admin.register(NodeType)
class NodeTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'base_cost', 'base_income']


@admin.register(Upgrade)
class UpgradeAdmin(admin.ModelAdmin):
    list_display = ['name', 'node_type', 'cost', 'multiplier']


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ['user', 'balance', 'last_collected']


@admin.register(OwnedNode)
class OwnedNodeAdmin(admin.ModelAdmin):
    list_display = ['player', 'node_type', 'quantity']
