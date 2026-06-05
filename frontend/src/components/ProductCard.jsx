import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'myapp.com';
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-gray-700 hover:scale-[1.02] transition-all duration-300 p-4 cursor-pointer">
        <img
          src={`${product.image}`}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg mb-4 opacity-90 hover:opacity-100 transition-opacity"
        />
        <h2 className="text-lg font-semibold text-gray-100 truncate">
          {product.name}
        </h2>
        <p className="text-emerald-400 font-semibold mt-1">${product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;