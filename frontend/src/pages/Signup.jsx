import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  //const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || 'http://localhost:8000';
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    setIsSuccess(false);

    // Front-end validation safety check
    if (form.password !== form.password2) {
      setMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/register/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(res.ok) {
        setIsSuccess(true);
        setMsg("Account created! Redirecting to login...");
        setTimeout(()=>nav("/login"), 1200);
      } else {
        // Parse Django rest framework error dicts dynamically
        const errorMsg = data.username || data.password || data.email || data.detail || JSON.stringify(data);
        setMsg(errorMsg);
      }
    } catch(err) {
      console.error(err);
      setMsg("Signup failed. Server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-100 p-4 sm:p-6">
      <div className="max-w-md w-full bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-extrabold mb-6 text-white tracking-tight">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
              Username
            </label>
            <input 
              name="username" 
              onChange={handleChange} 
              value={form.username} 
              placeholder="Pick a username" 
              required 
              className="w-full p-3 bg-gray-950 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition duration-150"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
              Email Address
            </label>
            <input 
              name="email" 
              type="email" 
              onChange={handleChange} 
              value={form.email} 
              placeholder="you@example.com" 
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
              Confirm Password
            </label>
            <input 
              name="password2" 
              type="password" 
              onChange={handleChange} 
              value={form.password2} 
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
            {isLoading ? "Creating Account..." : "Register"}
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
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition duration-150 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;