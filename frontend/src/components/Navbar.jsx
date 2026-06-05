import {Link, useNavigate} from 'react-router-dom';
import {useCart} from '../context/CartContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
    const {cartItems} = useCart();
    const navigate = useNavigate();
    
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };
    return (
        <nav className='bg-gray-300 shadow-md px-6 py-6 flex justify-between items-center fixed w-full top-0 z-50'>
            <Link to='/' className='text-2xl font-bold text-gray-800'>
            <span className='text-orange-600'>Shofing</span><span className=''>Spree</span>
            </Link>

            <div className='flex items-center gap-6 text-2xl '>
                {/* Login/SignUp or Logout */}
                {!isLoggedIn ? (
                    <>
                        <Link to='/login' className='text-blue-800 hover:text-gray-600 font-medium'>
                            Login
                        </Link>
                        <Link to='/signup' className='text-red-800 hover:text-gray-600 font-medium'>
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className='text-gray-800 btn-blue hover:text-gray-600 font-medium btn '>
                        Logout
                    </button>
                )}
                <Link to='/cart' className='relative text-gray-800 text-2xl hover:text-gray-600 font-bold'>
                🛒 Cart
                {cartCount > 0 && (
                    <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2'>
                        {cartCount}
                    </span>
                )}
            </Link>
            
            </div>

           
        </nav>
    )
}

export default Navbar;