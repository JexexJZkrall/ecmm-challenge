import CatalogControls from '@/components/CatalogControls';
import { getCategories, getProducts } from '@/services/api';

interface PageProps {
    searchParams: Promise<{search?: string; category?: string}>;
}

export default async function CatalogPage({searchParams}: PageProps) {
    const params = await searchParams;
    const search = params.search || '';
    const categoryId = params.category || '';

    const [products, categories] = await Promise.all([
        getProducts(search,categoryId),
        getCategories()
    ]);

    return (
        <main className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
            <header className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl'>
                    Catálogo de Productos Dentales
                </h1>
            </header>

            <CatalogControls
                search = {search}
                categoryId = {categoryId}
                categories = {categories}
                products = {products}
            />
        </div>
        </main>
    );
}
