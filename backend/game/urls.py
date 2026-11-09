from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import NodeTypeViewSet, PlayerViewSet, UpgradeViewSet, register

router = DefaultRouter()
router.register('player', PlayerViewSet, basename='player')
router.register('node-types', NodeTypeViewSet)
router.register('upgrades', UpgradeViewSet)

urlpatterns = [
    path('register/', register),
    path('login/', obtain_auth_token),
] + router.urls
