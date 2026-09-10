'use client';
import { useState, useEffect } from 'react';
import { createProduct, updateProduct, deleteProduct } from '@/services/api';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    onProductCreated: () => void;
    productToEdit?: Product | null;
}

export default function ProductForm({isOpen, onClose, categories, onProductCreated, productToEdit}: ProductFormProps){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const isEditing = !!productToEdit;

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price.toString());
            setStock(productToEdit.stock.toString());
            setCategory(typeof productToEdit.category === 'object' 
                ? (productToEdit.category as any).id.toString() 
                : productToEdit.category.toString()
            );
        } else {
            setName(''); setDescription(''); setPrice(''); setStock(''); setCategory('');
        }
        setErrorMsg(null);
    }, [productToEdit, isOpen]);

    if (!isOpen) return null;
    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setLoading(true);

        const payload = {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            category: Number(category),
        }

        try{
            if (isEditing && productToEdit){
                await updateProduct(productToEdit.id, payload);
            } else {
                await createProduct(payload);
            }
            onProductCreated();
            onClose();
        } catch (error: any) {
            console.error('Error al crear producto:', error);
            try {
                const parsedError = JSON.parse(error.message);
                setErrorMsg(Object.values(parsedError).flat().join(', '));
            } catch {
                setErrorMsg('Error inesperado al procesar la solicitud en el servidor');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!productToEdit || !window.confirm(`¿Estás seguro de eliminar "${productToEdit.name}"?`)) return;
        setLoading(true);
        const success = await deleteProduct(productToEdit.id);
        if (success) {
            setLoading(false)
            onProductCreated();
            onClose();
        } else {
            setErrorMsg('No se pudo eliminar el producto');
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in'>
            <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100 text-gray-700 transform transition-all'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl font-bold text-gray-900'>
                        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                    <button onClick={onClose} className='text-gray-400 hover:text-gray-600 text-2xl font-semibold'>&times;</button>
                </div>
                {errorMsg && (
                    <div className='mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 font-medium'>
                        {errorMsg}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase mb-1'>Nombre</label>
                        <input type='text'required value={name} onChange={e => setName(e.target.value)} className='w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'/>
                    </div>
                    <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase mb-1'>Descripción</label>
                            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className='w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none' placeholder='Detalles del producto...' />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs font-bold text-gray-500 uppercase mb-1'>Precio ($)</label>
                            <input type='number' min='0' required value={price} onChange={e => setPrice(e.target.value)} className='w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none' placeholder='0' />
                        </div>
                        <div>
                            <label className='block text-xs font-bold text-gray-500 uppercase mb-1'>Stock</label>
                            <input type='number' min='0' required value={stock} onChange={e => setStock(e.target.value)} className='w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none' placeholder='0' />
                        </div>
                    </div>
                    <div>
                        <label className='block text-xs font-bold text-gray-500 uppercase mb-1'>Categoría</label>
                        <select required value={category} onChange={e => setCategory(e.target.value)} className='w-full rounded-xl border border-gray-300 px-3 py-2.5 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                            <option value=''>Selecciona una categoría</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-between items-center pt-4 border-t mt-6'>
                        {isEditing ? (
                            <button type='button' onClick={handleDelete} disabled={loading} className='px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition text-sm'>
                                Eliminar
                            </button>
                        ) : <div />}
                        <div className='flex gap-2'>
                            <button type='button' onClick={onClose} disabled={loading} className='px-4 py-2 text-gray-500 hover:text-gray-700 font-medium'>
                                Cancelar
                            </button>
                            <button type='submit' disabled={loading} className='px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition disabled:bg-blue-400'>
                                {loading ? 'Guardando...' : isEditing? 'Guardar Cambios' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
