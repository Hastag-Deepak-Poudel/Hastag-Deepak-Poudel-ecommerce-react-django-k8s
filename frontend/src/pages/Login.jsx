import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
  // const BASE = import.meta.env.VITE_DJANGO_BASE_URL || '/';
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    setIsSuccess(false);
    setIsLoading(true);
    
    try {
      const res = await fetch(`/api/token/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        saveTokens(data);
        setIsSuccess(true);
        setMsg("Login successful! Redirecting...");
        setTimeout(()=>nav("/"), 800);
      } else {
        setMsg(data.detail || "Invalid credentials");
      }
    } catch(err) {
      console.error(err);
      setMsg("Login failed. Server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100 p-4 sm:p-6">
      <div className="max-w-md w-full bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-extrabold mb-6 text-white tracking-tight">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
              Username
            </label>
            <input 
              name="username" 
              onChange={handleChange} 
              value={form.username} 
              placeholder="Enter your username" 
              required 
              className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-150"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
              Password
            </label>
            <input 
              name="password" 
              type="password" 
              onChange={handleChange} 
              value={form.password} 
              placeholder="••••••••" 
              required 
              className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-150"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-3.5 rounded-xl hover:bg-emerald-500 transition duration-200 font-semibold tracking-wide shadow-lg shadow-emerald-900/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        {msg && (
          <div className={`mt-4 p-3 rounded-xl border text-sm text-center font-medium transition duration-200 ${
            isSuccess 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            {msg}
          </div>
        )}

        <div className="mt-6 text-sm text-center text-gray-400 border-t border-gray-800 pt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition duration-150 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;