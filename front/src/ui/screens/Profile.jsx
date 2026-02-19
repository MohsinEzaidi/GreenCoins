import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  History,
  Settings,
  Leaf,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";
import { useStore } from "../../viewmodel/useStore";

const Badge = ({ name, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-${color}-100 text-${color}-700 border border-${color}-200 text-xs font-medium`}
  >
    <Award size={14} />
    {name}
  </motion.div>
);

const Profile = () => {
  const { user, balance, totalEarned, rank, badges, streak } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pb-24 space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || "GreenUser"}`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">
            <Leaf size={16} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            {user?.username || "Green Warrior"}
          </h1>
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
            <Trophy size={14} className="text-amber-500" />
            Ranked {rank} &bull; {streak} Day Streak
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Available
          </span>
          <div className="text-2xl font-black text-slate-800 flex items-center gap-1">
            {balance}
            <span className="text-emerald-500 text-sm">GC</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Impact score
          </span>
          <div className="text-2xl font-black text-slate-800 flex items-center gap-1">
            {totalEarned}
            <TrendingUp size={16} className="text-blue-500" />
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Your Achievements</h2>
        <div className="flex flex-wrap gap-2">
          <Badge name="Early Adopter" color="emerald" />
          <Badge name="Recycle Pro" color="blue" />
          {badges.map((b, i) => (
            <Badge key={i} name={b} color="amber" />
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100 text-xs font-medium"
          >
            +12 more
          </motion.div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Milestones
          </h2>
          <button className="text-emerald-600 text-sm font-semibold">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Reached 500 Coins",
              date: "Yesterday",
              icon: Award,
              color: "bg-amber-100 text-amber-600",
            },
            {
              title: "Recycled 5kg Plastic",
              date: "2 days ago",
              icon: Leaf,
              color: "bg-emerald-100 text-emerald-600",
            },
            {
              title: "First Reward Redeemed",
              date: "Last week",
              icon: MapPin,
              color: "bg-blue-100 text-blue-600",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm"
            >
              <div className={`p-3 rounded-2xl ${m.color}`}>
                <m.icon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{m.title}</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {m.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
