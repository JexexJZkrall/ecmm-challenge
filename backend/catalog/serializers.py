from rest_framework import serializers
from .models import Product, Category

class ProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        error_messages={'blank': 'El nombre es obligatorio'}
    )
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'stock',
            'category',
            'created_at'
        ]

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                'El precio debe ser mayor o igual a 0'
            )
        return value

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'name',
        ]
    