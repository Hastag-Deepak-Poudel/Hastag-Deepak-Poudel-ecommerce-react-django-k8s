import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://localhost:8000';
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]); // Removed the commented-out BASEURL reference error

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        <div className="animate-pulse flex space-x-2 items-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          <span className="ml-2 font-medium">Loading details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl max-w-md text-center font-medium shadow-lg">
          ⚠️ Error: {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400 font-medium">
        No product found
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      return;
    }
    addToCart(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center p-4 sm:p-6 md:p-10 pt-24">
      <div className="bg-gray-900 shadow-2xl rounded-2xl p-6 md:p-8 max-w-4xl w-full border border-gray-800">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-950 rounded-xl overflow-hidden border border-gray-800/60 p-2">
            <img
              src={`${product.image}`}
              alt={product.name}
              className="max-h-[400px] w-full object-cover rounded-lg shadow-inner opacity-95 hover:opacity-100 transition-opacity duration-200"
            />
          </div>
          
          {/* Product Details Info */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
                {product.name}
              </h1>
              <p className="text-gray-400 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-gray-500 block mb-1">Price</span>
                <p className="text-3xl font-bold text-emerald-400">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={handleAddToCart} 
                  className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl hover:bg-emerald-500 transition duration-200 font-semibold tracking-wide shadow-lg shadow-emerald-900/30 text-center active:scale-[0.98]"
                >
                  Add to Cart 🛒
                </button>
                
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white font-medium text-center py-2 transition duration-150 text-sm sm:ml-2 flex items-center justify-center gap-1"
                >
                  &larr; Back to Home
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;