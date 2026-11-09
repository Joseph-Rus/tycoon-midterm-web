from rest_framework.routers import DefaultRouter

from .views import NodeTypeViewSet, UpgradeViewSet

router = DefaultRouter()
router.register('node-types', NodeTypeViewSet)
router.register('upgrades', UpgradeViewSet)

urlpatterns = router.urls
