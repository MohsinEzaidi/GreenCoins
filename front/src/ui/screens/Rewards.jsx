import React, { useState } from "react";
import { useStore } from "../../viewmodel/useStore";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from 'react-confetti';
import {
  Gift,
  Coffee,
  Percent,
  Smartphone,
  ShoppingCart,
  ShoppingBag,
  Ticket,
  TreePine,
  Heart,
  Zap,
  ChevronRight,
  Check,
  Star,
  Sparkles,
  X
} from "lucide-react";

const REWARDS = [
  { id: 1, name: "Artisan Coffee", coins: 50, icon: Coffee, category: "lifestyle", vendor: "Eco-Beanery", color: "bg-amber-500" },
  { id: 2, name: "Transport Pass", coins: 120, icon: Ticket, category: "travel", vendor: "CityTransit", color: "bg-blue-500" },
  { id: 3, name: "Donation: 5 Trees", coins: 200, icon: TreePine, category: "impact", vendor: "OneTreePlanted", color: "bg-emerald-500" },
  { id: 4, name: "Fashion Voucher", coins: 300, icon: ShoppingBag, category: "lifestyle", vendor: "SustainableWear", color: "bg-purple-500" },
  { id: 5, name: "Charity Meal", coins: 80, icon: Heart, category: "impact", vendor: "FoodFoundry", color: "bg-rose-500" },
];

export default function Rewards() {
  const { balance, addTransaction } = useStore();
  const [redeemed, setRedeemed] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleRedeem = (reward) => {
    if (balance >= reward.coins) {
      addTransaction({
        id: Date.now(),
        type: `Redeemed: ${reward.name}`,
        amount: -reward.coins,
        date: new Date().toISOString()
      });
      setRedeemed(reward);
    }
  };

  const filteredRewards = filter === "all" ? REWARDS : REWARDS.filter(r => r.category === filter);

  return (
    <div className="space-y-8 pb-32 p-4 min-h-screen">
      {redeemed && <ReactConfetti recycle={false} numberOfPieces={200} />}
      
      {/* Refined Balance Card */}
      <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl border-b-6 border-emerald-900">
         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] -mr-8 -mt-8" />
         <div className="flex items-center gap-2 mb-4">
           <Zap size={14} className="text-emerald-400 fill-emerald-400" />
           <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500/80">Available to Spend</p>
         </div>
         <div className="flex items-baseline gap-2 relative z-10">
           <h1 className="text-5xl font-black tracking-tightest leading-none">{balance.toLocaleString()}</h1>
           <span className="text-emerald-500 font-black text-xl uppercase tracking-widest leading-none">GC</span>
         </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
        {["all", "lifestyle", "travel", "impact"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              filter === cat ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white text-slate-400 border-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid gap-4">
        {filteredRewards.map((reward) => (
          <motion.div
            layout
            key={reward.id}
            className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:border-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-500/5 group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 ${reward.color} text-white rounded-2xl shadow-lg ring-4 ring-white`}>
                <reward.icon size={22} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base leading-none group-hover:text-emerald-700 transition-colors">{reward.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{reward.vendor}</p>
              </div>
            </div>
            <button
              onClick={() => handleRedeem(reward)}
              disabled={balance < reward.coins}
              className={`px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                balance >= reward.coins 
                ? "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg active:scale-90" 
                : "bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200"
              }`}
            >
              {reward.coins} GC
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {redeemed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1002] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-8 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-sm p-10 rounded-[3rem] text-center shadow-3xl border-b-8 border-emerald-500 relative"
            >
              <button 
                onClick={() => setRedeemed(null)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-950 transition-colors"
                ><X size={24} /></button>
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Check size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Success!</h2>
              <p className="text-slate-500 font-bold mb-8">
                Enjoy your {redeemed.name}. Your promo code:
              </p>
              <div className="bg-slate-50 p-6 rounded-[2rem] border-4 border-dashed border-slate-200 mb-8">
                <span className="text-3xl font-black text-slate-900 tracking-[0.2em]">ECO-{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Valid for 30 days</p>
              <button
                onClick={() => setRedeemed(null)}
                className="w-full bg-slate-950 text-white py-4.5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
