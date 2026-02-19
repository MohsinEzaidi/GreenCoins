import React from "react";
import { useStore } from "../../viewmodel/useStore";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  PlusCircle, 
  ArrowUpRight, 
  Zap, 
  Target, 
  Leaf, 
  BarChart3, 
  ShoppingBag,
  Award,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { balance, transactions, totalEarned, rank, streak } = useStore();
  const latestTransactions = [...transactions].reverse().slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-4 pb-32"
    >
      {/* Wallet Card */}
      <motion.div
        layoutId="wallet"
        className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border-b-6 border-emerald-900"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl backdrop-blur-md border border-white/5 shadow-inner">
              <Zap size={16} className="text-emerald-400 fill-emerald-400" />
            </div>
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-500/80">
              Personal Impact
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Crown size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-[9px] font-black tracking-widest uppercase text-white/80">Pro Tier</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-10 relative z-10">
          <motion.h1
            key={balance}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-black tracking-tightest leading-none"
          >
            {balance.toLocaleString()}
          </motion.h1>
          <span className="text-emerald-500 font-black text-xl tracking-widest opacity-80 decoration-double underline underline-offset-4">
            GC
          </span>
        </div>

        <div className="flex gap-4 relative z-10">
          <Link
            to="/add"
            className="flex-[1.5] bg-white text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-50 active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            <PlusCircle size={18} /> Record Action
          </Link>
          <Link
            to="/rewards"
            className="flex-1 bg-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md border border-white/5"
          >
            <ArrowUpRight size={18} /> Spend
          </Link>
        </div>
      </motion.div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/challenges" className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100/50 shadow-inner group hover:bg-emerald-100 transition-all relative overflow-hidden">
          <div className="absolute -top-4 -right-4 bg-emerald-500/10 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <div className="p-3 bg-white w-fit rounded-xl shadow-sm mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform relative z-10">
            <Target size={22} className="text-emerald-600" />
          </div>
          <p className="text-[10px] font-black uppercase text-emerald-800/40 mb-1 tracking-widest relative z-10">
            Daily Goal
          </p>
          <p className="text-2xl font-black text-emerald-950 tracking-tight relative z-10">82% <span className="text-xs text-emerald-600/50">Done</span></p>
        </Link>
        
        <Link to="/leaderboard" className="bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-800 shadow-2xl group hover:border-emerald-500/20 transition-all relative overflow-hidden">
          <div className="absolute -bottom-4 -left-4 bg-emerald-500/5 w-24 h-24 rounded-full blur-2xl" />
          <div className="p-3 bg-white/10 w-fit rounded-xl shadow-inner mb-4 group-hover:rotate-12 transition-transform relative z-10">
            <Award size={22} className="text-emerald-400" />
          </div>
          <p className="text-[10px] font-black uppercase text-white/30 mb-1 tracking-widest relative z-10">
            Global Rank
          </p>
          <p className="text-2xl font-black text-white tracking-tight relative z-10">#{rank} <span className="text-xs text-emerald-500">Top 12</span></p>
        </Link>
      </div>

      {/* Impact Story (Lifetime Stats) */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-6 relative overflow-hidden group">
        <div className="absolute -bottom-16 -right-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
           <Leaf size={240} />
        </div>
        
        <div className="flex items-center justify-between relative z-10">
           <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tightest">Lifetime Legacy</h3>
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-emerald-500 rounded-full" />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Carbon Contribution</p>
              </div>
           </div>
           <Link to="/analytics" className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
              <BarChart3 size={24} />
           </Link>
        </div>

        <div className="flex items-center gap-6 relative z-10">
           <div className="text-5xl font-black text-slate-950 tracking-tightest decoration-emerald-500/20 decoration-8 underline underline-offset-[10px]">
              {totalEarned.toLocaleString()}
           </div>
           <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 w-fit">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Top 5%</span>
              </div>
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=U${i}`} className="w-8 h-8 rounded-full border-2 border-white shadow-md shadow-slate-200/50" alt="" />
                 ))}
                 <div className="w-8 h-8 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white shadow-md shadow-emerald-200">+12k</div>
              </div>
           </div>
        </div>

        <div className="pt-4 border-t border-slate-50 flex justify-between items-center relative z-10">
           <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Impact Streak</span>
                <span className="text-lg font-black text-slate-900 italic">{streak} Days 🔥</span>
              </div>
           </div>
           <button className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50/50 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors">
              Claim Bonus
           </button>
        </div>
      </div>

      {/* Recent Activity Mini List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-slate-900 tracking-tightest">
              Recent Activity
            </h3>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Feed</span>
          </div>
          <Link
            to="/history"
            className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-xl hover:bg-emerald-100 active:scale-95 transition-all"
          >
            Full Log
          </Link>
        </div>

        <div className="grid gap-4">
          {latestTransactions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
               <p className="text-slate-400 font-black uppercase tracking-[0.15em] text-[10px]">No impact recorded yet</p>
               <Link to="/add" className="mt-2 text-emerald-600 font-black text-[9px] uppercase tracking-widest underline underline-offset-4">Start Now</Link>
            </div>
          ) : (
            latestTransactions.map((tx) => (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                key={tx.id}
                className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm group hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3.5 rounded-xl transition-all duration-300 ${
                    tx.amount > 0 
                    ? "bg-slate-50 text-slate-900 group-hover:bg-emerald-500 group-hover:text-white" 
                    : "bg-slate-50 text-slate-900 group-hover:bg-slate-950 group-hover:text-white"
                  }`}>
                    {tx.amount > 0 ? (
                      <TrendingUp size={20} />
                    ) : (
                      <ShoppingBag size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base tracking-tightest leading-none group-hover:text-emerald-700 transition-colors uppercase">
                      {tx.type}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mt-2">
                       {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-black tracking-tightest ${
                    tx.amount > 0 ? "text-emerald-600" : "text-slate-900"
                  }`}>
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount}
                  </p>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">GC</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
