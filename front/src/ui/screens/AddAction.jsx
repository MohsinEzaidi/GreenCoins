import React, { useState } from "react";
import { useStore } from "../../viewmodel/useStore";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from 'react-confetti';
import {
  Recycle,
  Lightbulb,
  Droplets,
  Users,
  Check,
  ChevronRight,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
  Leaf
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ACTIONS = [
  { id: "recycle", label: "Recycling", icon: Recycle, coins: 10, unit: "items", color: "bg-blue-500" },
  { id: "energy", label: "Save Energy", icon: Lightbulb, coins: 20, unit: "actions", color: "bg-amber-500" },
  { id: "water", label: "Save Water", icon: Droplets, coins: 15, unit: "liters", color: "bg-cyan-500" },
  { id: "community", label: "Community", icon: Users, coins: 50, unit: "hour", color: "bg-emerald-500" },
];

export default function AddAction() {
  const { addTransaction } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleComplete = () => {
    addTransaction({
      id: Date.now(),
      type: `${selected.label}`,
      amount: selected.coins * amount,
      date: new Date().toISOString()
    });
    setSuccess(true);
  };

  return (
    <div className="min-h-screen p-4 pb-32 flex flex-col">
       {success && <ReactConfetti recycle={false} numberOfPieces={300} />}
       
       <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tightest leading-none">Record Impact</h1>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Level 12 Eco-Warrior</p>
          </div>
       </div>

       <AnimatePresence mode="wait">
         {!success ? (
           step === 1 ? (
             <motion.div 
               key="step1"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="grid gap-4"
             >
                {ACTIONS.map(action => (
                  <button
                    key={action.id}
                    onClick={() => { setSelected(action); setStep(2); }}
                    className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-5">
                       <div className={`p-4 ${action.color} text-white rounded-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
                          <action.icon size={24} />
                       </div>
                       <div>
                          <h3 className="font-black text-slate-900 text-lg leading-none">{action.label}</h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{action.coins} GC / {action.unit}</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-200 group-hover:text-emerald-500" />
                  </button>
                ))}
             </motion.div>
           ) : (
             <motion.div 
               key="step2"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="flex-1 flex flex-col justify-center items-center gap-12"
             >
                <div className={`p-10 ${selected.color} text-white rounded-[3rem] shadow-2xl relative`}>
                    <selected.icon size={64} />
                    <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-2xl shadow-xl text-slate-900"><Sparkles size={24} className="animate-pulse" /></div>
                </div>
                
                <div className="text-center space-y-2">
                   <h2 className="text-4xl font-black text-slate-900 tracking-tightest leading-none capitalize">{selected.label}</h2>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">How many {selected.unit}?</p>
                </div>

                <div className="flex items-center gap-10">
                   <button onClick={() => setAmount(Math.max(1, amount-1))} className="p-6 bg-slate-50 text-slate-900 rounded-[1.5rem] hover:bg-slate-100 transition-colors active:scale-90"><Minus size={32}/></button>
                   <span className="text-7xl font-black text-slate-950 tracking-tighter w-20 text-center">{amount}</span>
                   <button onClick={() => setAmount(amount+1)} className="p-6 bg-slate-50 text-slate-900 rounded-[1.5rem] hover:bg-slate-100 transition-colors active:scale-90"><Plus size={32}/></button>
                </div>

                <div className="w-full grid gap-4">
                  <button 
                    onClick={handleComplete}
                    className={`w-full ${selected.color} text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-3`}
                  >
                    Confirm Earn <div className="bg-white/20 px-3 py-1 rounded-full">{amount * selected.coins} GC</div>
                  </button>
                  <button onClick={() => setStep(1)} className="text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">Cancel</button>
                </div>
             </motion.div>
           )
         ) : (
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="flex-1 flex flex-col items-center justify-center text-center p-6"
           >
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] shadow-2xl flex items-center justify-center mb-8 rotate-12">
                 <Check size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter leading-none">Impact Verified!</h2>
              <p className="text-slate-500 font-bold mb-10 leading-relaxed uppercase text-xs tracking-widest">You just saved {amount * 0.5}kg of CO2 today</p>
              
              <div className="grid gap-4 w-full">
                <button 
                  onClick={() => navigate('/')}
                  className="w-full bg-slate-950 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                >Dashboard</button>
                <button 
                  onClick={() => { setStep(1); setSuccess(false); setAmount(1); }}
                  className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] py-4"
                >Record another action</button>
              </div>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
