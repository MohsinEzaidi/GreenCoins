import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../../viewmodel/useStore";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login({ name: email.split("@")[0], email });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-emerald-600 w-16 h-16 rounded-[24px] flex items-center justify-center mb-10 shadow-lg shadow-emerald-200">
          <LogIn className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Welcome back.
        </h1>
        <p className="text-slate-500 font-medium mb-12">
          Login to your GreenCoin account.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 ring-emerald-500/10 transition-all font-bold placeholder:text-slate-300"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 ring-emerald-500/10 transition-all font-bold placeholder:text-slate-300"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="mt-12 text-center font-bold text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 ml-1">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
