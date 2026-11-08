from decimal import Decimal

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone

# each node you buy costs 15% more than the last one
COST_GROWTH = Decimal('1.15')


class NodeType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    base_cost = models.DecimalField(max_digits=20, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    base_income = models.DecimalField(max_digits=20, decimal_places=2, validators=[MinValueValidator(Decimal('0'))])

    def price_for(self, quantity):
        return (self.base_cost * COST_GROWTH ** quantity).quantize(Decimal('0.01'))

    def __str__(self):
        return self.name


class Upgrade(models.Model):
    name = models.CharField(max_length=100, unique=True)
    node_type = models.ForeignKey(NodeType, on_delete=models.CASCADE, related_name='upgrades')
    cost = models.DecimalField(max_digits=20, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    multiplier = models.DecimalField(max_digits=5, decimal_places=2, default=2, validators=[MinValueValidator(Decimal('1'))])

    def __str__(self):
        return self.name


class Player(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='player')
    balance = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    last_collected = models.DateTimeField(default=timezone.now)
    upgrades = models.ManyToManyField(Upgrade, blank=True, related_name='players')

    def income_per_second(self):
        bought = list(self.upgrades.all())
        total = Decimal('0')
        for node in self.nodes.all():
            income = node.node_type.base_income * node.quantity
            for upgrade in bought:
                if upgrade.node_type_id == node.node_type_id:
                    income *= upgrade.multiplier
            total += income
        return total

    def collect(self, now=None):
        # add the money earned since the last time we checked (works for offline time too)
        now = now or timezone.now()
        seconds = max((now - self.last_collected).total_seconds(), 0)
        earned = self.income_per_second() * Decimal(str(seconds))
        self.balance += earned.quantize(Decimal('0.01'))
        self.last_collected = now

    def __str__(self):
        return self.user.username


class OwnedNode(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='nodes')
    node_type = models.ForeignKey(NodeType, on_delete=models.CASCADE, related_name='owned')
    quantity = models.PositiveIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['player', 'node_type'], name='unique_player_node'),
        ]

    def __str__(self):
        return f'{self.player} - {self.node_type} x{self.quantity}'
