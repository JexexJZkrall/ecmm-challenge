'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductForm from './ProductForm';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

interface CatalogControlsProps {
    search: string;
    categoryId: string;
    categories: Category[];
    products: Product[];
}

export default function CatalogControls({
    search,
    categoryId,
    categories,
    products,
}: CatalogControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const updateUrl = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/?${params.toString()}`);
    };

    const handleOpenEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    return (
        <>
            <div className='mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between'>
                <div className='flex flex-col sm:flex-row gap-4 w-full md:flex-1'>
                    <div className='w-full'>
                        <input
                            type='text'
                            placeholder='Buscar por nombre...'
                            value={search}
                            onChange={(event) => updateUrl('search',event.target.value)}
                            className='w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner'
                        />
                    </div>
                    <div className='w-full sm:w-64'>
                        <select
                            value={categoryId}
                            onChange={(event) => updateUrl('category', event.target.value)}
                            className='w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-700 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        >
                            <option value=''>Todas las categorías</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='w-full md:w-auto pt-5 md:pt-0'>
                    <button
                        type='button'
                        onClick={() => {setSelectedProduct(null); setIsFormOpen(true);}}
                        className='w-full md:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                        <span className="mr-2 text-lg font-bold">+</span> Crear producto
                    </button>
                </div>
            </div>
            {products.length === 0 ? (
                <div className='text-center bg-white p-12 rounded-xl shadow-sm border border-gray-200'>
                    <p className='text-gray-600 text-lg font-medium'>
                        No se encontraron productos en el catálogo.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleOpenEdit(product)}
                            className='bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between group'
                        >
                            <div>
                                <div className='flex justify-between items-start mb-4'>
                                    <h2 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>
                                        {product.name}
                                    </h2>
                                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200'>
                                        ID: {product.id}
                                    </span>
                                </div>
                                <p className='text-sm text-gray-500 line-clamp-4 min-h-[5rem]'>
                                    {product.description}
                                </p>
                            </div>
                            <div className='mt-6 pt-4 border-t border-gray-100 flex items-center justify-between'>
                                <div>
                                    <p className='text-xs text-gray-400 uppercase tracking-wider font-semibold'>
                                        Precio
                                    </p>
                                    <p className='text-2xl font-extrabold text-gray-900'>
                                        ${Number(product.price).toLocaleString('es-CL')}
                                    </p>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                                        product.stock > 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                                    </span>
                                </div>
                            </div>    
                        </div>        
                    ))}
                </div>
            )}
            <ProductForm
                isOpen={isFormOpen}
                onClose={() => { setIsFormOpen(false); setSelectedProduct(null);}}
                categories={categories}
                productToEdit={selectedProduct}
                onProductCreated={() => router.refresh()}
            />
        </>
    )
}
