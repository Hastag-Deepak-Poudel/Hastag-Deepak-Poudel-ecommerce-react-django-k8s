import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();
    // const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://localhost:8000';
    console.log("Cart Items:", cartItems);

    return (
        <div className="pt-24 min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-8 selection:bg-emerald-500/30">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight">
                <span className="mr-2">🛒</span> Your Cart
            </h1>
            
            {cartItems.length === 0 ? (
                <div className="max-w-md mx-auto text-center bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl mt-12">
                    <p className="text-gray-400 text-lg mb-6">Your cart is feeling a bit light.</p>
                    <Link to="/" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-emerald-900/20">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800">
                    <div className="divide-y divide-gray-800">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
                            >
                                {/* Left Side: Product Image & Details */}
                                <div className="flex items-center gap-4">
                                    {item.product_image && (
                                        <img
                                            src={`${item.product_image}`}
                                            alt={item.product_name}
                                            className="w-20 h-20 object-cover rounded-xl border border-gray-800 bg-gray-800 shadow-inner"
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-100 line-clamp-1">
                                            {item.product_name}
                                        </h2>
                                        <p className="text-emerald-400 font-medium mt-0.5">
                                            ${item.product_price}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Controls */}
                                <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-gray-800/50 pt-3 sm:pt-0 sm:border-none">
                                    <div className="flex items-center gap-1 bg-gray-800 border border-gray-700/50 rounded-xl p-1 shadow-inner">
                                        <button 
                                            className="bg-gray-700 hover:bg-gray-600 active:scale-95 text-gray-200 w-8 h-8 flex items-center justify-center rounded-lg transition duration-150 font-bold disabled:opacity-40"
                                            disabled={item.quantity <= 1}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            —
                                        </button>
                                        <span className="w-10 text-center font-semibold text-gray-100">{item.quantity}</span>
                                        <button 
                                            className="bg-gray-700 hover:bg-gray-600 active:scale-95 text-gray-200 w-8 h-8 flex items-center justify-center rounded-lg transition duration-150 font-bold"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 font-medium px-3 py-1.5 rounded-lg transition duration-200 text-sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Footer */}
                    <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-center sm:text-left">
                            <span className="text-sm uppercase tracking-wider font-bold text-gray-500 block mb-0.5">Estimated Total</span>
                            <span className="text-3xl font-bold text-white">${total.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 rounded-xl hover:bg-emerald-500 transition duration-200 shadow-lg shadow-emerald-900/30 text-center font-semibold tracking-wide active:scale-[0.98]">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;