import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  User,
} from "lucide-react";
import { useStore } from "../../viewmodel/useStore";

const dummyLeaderboard = [
  { id: 1, name: "EcoGuru Sarah", coins: 4250, change: "up", avatar: "Sara" },
  {
    id: 2,
    name: "Planetary Pete",
    coins: 3980,
    change: "down",
    avatar: "Pete",
  },
  {
    id: 3,
    name: "GreenGuard Elena",
    coins: 3120,
    change: "same",
    avatar: "Elena",
  },
  { id: 4, name: "BottleBen", coins: 2840, change: "up", avatar: "Ben" },
  { id: 5, name: "NatureNic", coins: 2590, change: "up", avatar: "Nic" },
  { id: 6, name: "RecycleRay", coins: 2100, change: "down", avatar: "Ray" },
  { id: 7, name: "ForestFiona", coins: 1850, change: "same", avatar: "Fiona" },
  { id: 8, name: "ZeroWasteZak", coins: 1540, change: "up", avatar: "Zak" },
];

const Leaderboard = () => {
  const { user, totalEarned } = useStore();
  const [tab, setTab] = useState("global");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pb-24 space-y-6"
    >
      {/* Dynamic Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Leaderboard
        </h1>
        <p className="text-slate-500 text-sm">
          See how your impact compares with others.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-3xl backdrop-blur-md">
        {["global", "friends", "local"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-2xl transition-all duration-300 capitalize ${
              tab === t
                ? "bg-white text-emerald-600 shadow-xl scale-100"
                : "text-slate-500 scale-95 opacity-70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top 3 Spotlight */}
      <div className="flex items-end justify-center gap-4 py-8">
        {/* 2nd Place */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center border-4 border-white shadow-lg">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Pete`}
                className="w-full h-full p-1"
                alt=""
              />
            </div>
            <div className="absolute -top-3 -left-3 bg-slate-400 text-white w-7 h-7 flex items-center justify-center rounded-xl border-4 border-white font-black text-xs shadow-md">
              2
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-500">Pete</span>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center border-4 border-white shadow-2xl">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah`}
                className="w-full h-full p-1 shadow-inner"
                alt=""
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-400">
                <Trophy size={32} strokeWidth={3} />
              </div>
            </div>
            <div className="absolute -top-3 -left-3 bg-amber-500 text-white w-9 h-9 flex items-center justify-center rounded-2xl border-4 border-white font-black text-sm shadow-lg animate-bounce">
              1
            </div>
          </div>
          <span className="text-xs font-black text-slate-900">Sarah</span>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center border-4 border-white shadow-lg">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Elena`}
                className="w-full h-full p-1"
                alt=""
              />
            </div>
            <div className="absolute -top-3 -left-3 bg-orange-400 text-white w-7 h-7 flex items-center justify-center rounded-xl border-4 border-white font-black text-xs shadow-md">
              3
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-500">Elena</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence>
          {dummyLeaderboard.slice(3).map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className="w-6 text-sm font-black text-slate-300">
                {index + 4}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center overflow-hidden border border-emerald-100 shadow-inner">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatar}`}
                  className="w-full h-full p-1"
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">
                  {player.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-semibold text-emerald-600">
                    {player.coins} GC
                  </span>
                  {player.change === "up" && (
                    <TrendingUp size={12} className="text-emerald-500" />
                  )}
                  {player.change === "down" && (
                    <TrendingDown size={12} className="text-rose-500" />
                  )}
                  {player.change === "same" && (
                    <Minus size={12} className="text-slate-300" />
                  )}
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Current User Bar Fixed */}
      <div className="fixed bottom-24 left-6 right-6 z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-emerald-600 text-white p-4 rounded-[2rem] shadow-2xl flex items-center gap-4 border-4 border-white"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden">
            <User size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold truncate">
              You ({user?.username || "Warrior"})
            </h4>
            <span className="text-[10px] font-black opacity-80 uppercase tracking-widest">
              Rank #124 &bull; {totalEarned} GC
            </span>
          </div>
          <button className="bg-white text-emerald-600 px-3 py-1.5 rounded-xl font-bold text-xs ring-4 ring-emerald-500">
            View Rank
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
