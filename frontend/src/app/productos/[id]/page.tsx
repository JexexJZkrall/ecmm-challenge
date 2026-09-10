import { getProductById } from '@/services/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    
    const product = await getProductById(Number(id));

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-gray-700">
                
                <div className="mb-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        ← Volver al catálogo principal
                    </Link>
                </div>

                <div className="border-b border-gray-100 pb-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {product.name}
                        </h1>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border self-start">
                            ID: {product.id}
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Descripción
                        </h3>
                        <p className="text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                            {product.description || "Este producto no tiene una descripción disponible."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
                                Precio
                            </h4>
                            <p className="text-3xl font-black text-gray-900">
                                ${Number(product.price).toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                Stock Disponible
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                <p className="text-lg font-bold text-gray-800">
                                    {product.stock > 0 ? `${product.stock} unidades` : 'Sin stock'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}