import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  //const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://localhost:8000';

    useEffect(() => {
        fetch(`/api/products/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .then((data)=>{
            setProducts(data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

   return (
    <div className="min-h-screen bg-gray-950 text-gray-100 selection:bg-emerald-500/30">
        {/* Sticky/Fixed top Header matching the new theme */}
        <header className="bg-gray-900 border-b border-gray-800 shadow-xl sticky top-0 z-10 backdrop-blur-md bg-opacity-95">
            <h1 className="text-3xl font-extrabold text-center py-5 text-white tracking-tight">
                Product List
            </h1>
        </header>

        {/* Product Grid Layout */}
        <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 sm:p-8">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full text-center py-16 bg-gray-900/50 border border-gray-800/60 rounded-2xl p-8 max-w-md mx-auto mt-12">
                    <span className="text-4xl block mb-3">📦</span>
                    <p className="text-gray-400 font-medium">No products available right now.</p>
                </div>
            )}
        </main>
    </div>
    );
}

export default ProductList;