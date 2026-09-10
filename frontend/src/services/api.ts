import {Product} from '@/types/product';
import {Category} from '@/types/category';

const DJANGO_API_URL = 'http://127.0.0.1:8000/api';
const PRODUCTS_URL = `${DJANGO_API_URL}/productos/`;
const CATEGORIES_URL = `${DJANGO_API_URL}/categorias/`;

export async function getProducts(search?: string, categoryId?: string): Promise<Product[]> {
    try {
        const url = new URL(PRODUCTS_URL);
        if (search) url.searchParams.append('search', search);
        if (categoryId) url.searchParams.append('category', categoryId);

        const response = await fetch(url.toString(), {cache: 'no-store'});
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al traer productos desde backend Django', error);
        return [];
    }
}

export async function createProduct(productData: Omit<Product,'id' | 'created_at'>): Promise<boolean> {
    try {
        const response = await fetch(PRODUCTS_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productData)
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.ok;
    } catch (error) {
        console.error('Error al crear el producto', error);
        return false;
    }
}

export async function getProductById(id: number): Promise<Product | null>{
    try{
        const response = await fetch(`${PRODUCTS_URL}${id}/`, {cache: 'no-store'});
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error al consultar por ID:', error);
        return null;
    }
}

export async function updateProduct(id: number, productData: Omit<Product, 'id' | 'created_at'>): Promise<Product>{
    const response = await fetch(`${PRODUCTS_URL}${id}/`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productData)
    });
    const data = await response.json();
    if(!response.ok) throw new Error(JSON.stringify(data));
    return data;
}

export async function deleteProduct(id: number): Promise<boolean>{
    try {
        const response = await fetch(`${PRODUCTS_URL}${id}/`, {method: 'DELETE'});
        return response.ok;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return false;
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch(CATEGORIES_URL, {cache: 'no-store'});
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al traer categorías desde backend Django', error);
        return [];
    }
}
