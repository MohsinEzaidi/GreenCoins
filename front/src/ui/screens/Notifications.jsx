import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Award,
  AlertCircle,
  Trash2,
  X,
  Calendar,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useStore } from "../../viewmodel/useStore";

const NotificationItem = ({ id, title, message, date, read, index }) => {
  const { markNotificationRead } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => markNotificationRead(id)}
      className={`group relative flex gap-5 p-5 rounded-[2.5rem] border transition-all cursor-pointer ${
        read
          ? "bg-white border-slate-50 opacity-60"
          : "bg-white border-emerald-100 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/10"
      }`}
    >
      <div
        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
          title.includes("Achievement")
            ? "bg-amber-100 text-amber-600 shadow-amber-200/50"
            : title.includes("Welcome")
              ? "bg-emerald-100 text-emerald-600 shadow-emerald-200/50"
              : "bg-blue-100 text-blue-600 shadow-blue-200/50"
        }`}
      >
        {title.includes("Achievement") ? (
          <Award size={24} />
        ) : title.includes("Welcome") ? (
          <Bell size={24} />
        ) : (
          <AlertCircle size={24} />
        )}
      </div>

      <div className="flex-1 space-y-1 pr-6">
        <div className="flex items-center justify-between">
          <h4
            className={`text-sm font-black tracking-tight ${read ? "text-slate-400" : "text-slate-900 group-hover:text-emerald-600"}`}
          >
            {title}
          </h4>
          {!read && (
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          )}
        </div>
        <p
          className={`text-xs font-bold leading-relaxed ${read ? "text-slate-400/80" : "text-slate-500"}`}
        >
          {message}
        </p>
        <div className="flex items-center gap-1.5 pt-2">
          <Calendar size={12} className="text-slate-300" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
            {new Date(date).toLocaleDateString([], {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};

const Notifications = () => {
  const { notifications } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pb-24 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Inbox
          </h1>
          <p className="text-slate-500 font-bold text-sm">
            Updates & Achievements.
          </p>
        </div>
        <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 active:scale-95 transition-all">
          <CheckCircle2 size={24} />
        </button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notifications.map((n, i) => (
              <NotificationItem key={n.id} {...n} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center space-y-4"
        >
          <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[2.5rem] flex items-center justify-center shadow-inner">
            <Bell size={48} strokeWidth={1} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-300">Quiet for now</h3>
            <p className="text-slate-400/50 font-bold text-sm">
              New updates will appear here.
            </p>
          </div>
        </motion.div>
      )}

      {/* Recommended for you */}
      <div className="space-y-4 pt-12">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="text-amber-400" size={20} /> For you
        </h2>
        <div className="bg-slate-900 rounded-[3.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                Daily Challenge
              </span>
              <h3 className="text-2xl font-black leading-tight tracking-tight">
                Collect 10 Plastics today for a 2x Bonus
              </h3>
            </div>
            <button className="flex items-center gap-4 group justify-between w-full px-6 py-4 bg-white/10 hover:bg-white/20 rounded-[2rem] border border-white/10 transition-all active:scale-95">
              <span className="text-xs font-black uppercase tracking-widest">
                Start Challenge
              </span>
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
