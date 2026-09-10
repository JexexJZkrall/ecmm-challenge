from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet

router = DefaultRouter()
router.register(r'productos', ProductViewSet)
router.register(r'categorias', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
