import React from "react";
import { useStore } from "../../viewmodel/useStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  ShoppingBag,
  Leaf,
  Calendar,
  Search,
  ArrowRight,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TransactionHistory() {
  const transactions = useStore((state) => state.transactions);

  return (
    <div className="space-y-10 pb-24 p-4">
      {/* Header */}
      <div className="flex items-center justify-between py-6 sticky top-0 bg-white/80 backdrop-blur-xl z-20 -mx-4 px-8 border-b border-slate-50">
        <Link to="/" className="p-4 bg-slate-50 text-slate-900 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 active:scale-95">
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-xl font-black text-slate-950 tracking-tight uppercase leading-none">Wallet History</h2>
        <div className="w-14 h-14" /> {/* Spacer */}
      </div>

      <div className="bg-slate-950 p-10 rounded-[4rem] text-white relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-b-8 border-emerald-900 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4">Activity Log</p>
        <div className="flex items-center justify-between">
           <div>
              <p className="text-5xl font-black tracking-tighter leading-none mb-2">{transactions.length}</p>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-none">Total Events</p>
           </div>
           <div className="p-5 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 group-hover:rotate-12 transition-transform">
              <Sparkles size={32} className="text-emerald-400" />
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {transactions.length === 0 ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-20 bg-slate-50 rounded-[5rem] border-4 border-dashed border-slate-200"
            >
              <div className="bg-white p-8 rounded-full w-fit mx-auto shadow-sm mb-6">
                 <Leaf className="text-emerald-200" size={48} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">
                No impact recorded yet
              </p>
            </motion.div>
          ) : (
            [...transactions].reverse().map((tx, idx) => (
              <motion.div
                key={tx.id || idx}
                initial={{ opacity: 0, y: 10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-7 bg-white rounded-[3rem] border-4 border-slate-50 shadow-xl shadow-slate-100/50 hover:border-emerald-500/10 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`p-4 rounded-[1.5rem] transition-colors ${
                      tx.amount > 0 ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white"
                    }`}
                  >
                    {tx.amount > 0 ? (
                      <TrendingUp size={24} />
                    ) : (
                      <ShoppingBag size={24} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-950 text-lg leading-none mb-2 uppercase tracking-tightest">
                       {tx.type}
                    </h4>
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full w-fit border border-slate-100 group-hover:border-emerald-100 transition-colors">
                      <Calendar size={10} className="text-slate-400" />
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter leading-none">
                        {tx.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-black text-2xl tracking-tighter mb-1 ${
                      tx.amount > 0 ? "text-emerald-600" : "text-slate-950 decoration-emerald-500/20 underline decoration-4 underline-offset-4"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </p>
                  <div className="flex items-center gap-1 justify-end px-2 py-0.5 bg-emerald-50 rounded-lg text-[8px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100/50">
                     GC <ArrowRight size={8} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
