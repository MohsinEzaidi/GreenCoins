import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Leaf, ArrowRight, Users, Zap } from "lucide-react";
import { useStore } from "../../viewmodel/useStore";

const challenges = [
  { id: 1, title: "Plastic Pilot", desc: "Recycle 5 plastic bottles today.", reward: 50, progress: 3, total: 5, type: "Daily", icon: Trophy, color: "emerald text-emerald-600 bg-emerald-50" },
  { id: 2, title: "Paper Trail", desc: "Dispose of 10kg of old newspapers.", reward: 150, progress: 4, total: 10, type: "Weekly", icon: Leaf, color: "blue text-blue-600 bg-blue-50" },
];

const ProgressBar = ({ current, total, colorClass }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-slate-300">
        <span>Progress</span>
        <span className="text-slate-900">{current} / {total}</span>
      </div>
      <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default function Challenge() {
  const streak = useStore((state) => state.streak) || 0;

  return (
    <div className="p-6 pb-32 space-y-10">
      <div className="flex flex-col gap-4 text-center">
        <div className="self-center p-5 bg-emerald-50 text-emerald-500 rounded-[2.5rem] mb-2 shadow-inner ring-12 ring-emerald-500/5">
          <Zap size={48} strokeWidth={1} />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tightest uppercase italic">Active Goals</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Current Streak: {streak} Days 🔥</p>
        </div>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge, idx) => (
          <div key={challenge.id} className="group relative bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all active:scale-[0.98]">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${challenge.color}`}>
                <challenge.icon size={24} />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-slate-900 tracking-widest uppercase">{challenge.reward} GC</span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-black text-slate-900 tracking-tightest uppercase">{challenge.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-bold">{challenge.desc}</p>
            </div>
            <ProgressBar current={challenge.progress} total={challenge.total} />
            <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              Details <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
