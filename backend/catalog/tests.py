from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Category, Product

class ProductAPITests(APITestCase):

    def setUp(self):
        # Categoría base para las llaves foráneas
        self.category = Category.objects.create(name='Instrumento Dental')
        self.url = reverse('product-list')

    """Test 1: Creación correcta de un producto con datos válidos"""
    def test_creacion_correcta_producto(self):
        data = {
            'name': 'Espejo Dental Nro 4',
            'description': 'Espejo de exploración dental con mango de acero inoxidable.',
            'price': 8000,
            'stock': 25,
            'category': self.category.id
        }
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().name, 'Espejo Dental Nro 4')


    """Test 2: Rechazo de datos inválidos (Precio negativo)"""
    def test_rechazo_datos_invalidos_precio_negativo(self):
        data = {
            'name': 'Sonda de Exploración',
            'description': 'Datos inválidos intencionales.',
            'price': -500,
            'stock': 10,
            'category': self.category.id
        }
        response = self.client.post(self.url, data, format='json')
        
        # Validaciones de rechazo
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('El precio debe ser mayor o igual a 0', response.content.decode('utf-8'))

    """Test adicional: Rechazo de datos inválidos (Nombre vacío)"""
    def test_rechazo_datos_invalidos_nombre_vacio(self):
        data = {
            'name': '   ',
            'description': 'Sin nombre real.',
            'price': 2000,
            'stock': 5,
            'category': self.category.id
        }
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('El nombre es obligatorio', response.content.decode('utf-8'))