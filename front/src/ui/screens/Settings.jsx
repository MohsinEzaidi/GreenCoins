import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  MapPin,
  Moon,
  Sun,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Globe,
  Heart,
  Mail,
  Smartphone,
  Info,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../viewmodel/useStore";

const SettingToggle = ({ icon: Icon, label, status, onClick, colorClass }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all active:scale-[0.98]"
  >
    <div className="flex items-center gap-6">
      <div
        className={`p-4 rounded-[1.75rem] ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform shadow-inner`}
      >
        <Icon className={colorClass.replace("bg-", "text-")} size={26} />
      </div>
      <div className="text-left py-1">
        <h4 className="text-lg font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
          {label}
        </h4>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-60">
          Manage your preference
        </p>
      </div>
    </div>
    <div
      className={`relative w-16 h-9 rounded-full transition-all duration-500 flex items-center p-1.5 ${status ? "bg-emerald-500 shadow-lg shadow-emerald-500/30" : "bg-slate-200 shadow-inner"}`}
    >
      <motion.div
        animate={{ x: status ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-lg border border-slate-100/50"
      />
    </div>
  </button>
);

const SettingLink = ({ icon: Icon, label, value, colorClass }) => (
  <button className="w-full flex items-center justify-between p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all active:scale-[0.98]">
    <div className="flex items-center gap-6">
      <div
        className={`p-4 rounded-[1.75rem] ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform shadow-inner`}
      >
        <Icon className={colorClass.replace("bg-", "text-")} size={26} />
      </div>
      <div className="text-left py-1">
        <h4 className="text-lg font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
          {label}
        </h4>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-60">
          {value}
        </p>
      </div>
    </div>
    <ChevronRight
      size={24}
      className="text-slate-200 group-hover:text-emerald-500 transition-colors"
    />
  </button>
);

const Settings = () => {
  const { preferences, toggleTheme, logout, user } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pb-24 space-y-10"
    >
      <div className="flex flex-col gap-2 pt-4">
        <h1 className="text-4xl font-black text-slate-950 tracking-tightest">
          Settings
        </h1>
        <p className="text-slate-500 font-bold text-sm">
          Personalize your green footprint.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-slate-950 rounded-[3.5rem] p-10 text-white relative overflow-hidden group shadow-3xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] bg-white/10 flex items-center justify-center border-4 border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || "GreenUser"}`}
                alt="Avatar"
                className="w-full h-full object-cover p-1 scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2.5 rounded-2xl border-4 border-slate-950 shadow-xl group-hover:rotate-12 transition-transform">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight">
              {user?.username || "Green Warrior"}
            </h2>
            <p className="text-sm font-bold text-emerald-400 tracking-wider uppercase opacity-80">
              Eco Pro Level 5
            </p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em]">
                  Joined
                </span>
                <span className="text-xs font-bold">Jan 2026</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em]">
                  Rank
                </span>
                <span className="text-xs font-bold text-emerald-400">#124</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Account Section */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">
            Personal Account
          </h3>
          <div className="space-y-4">
            <SettingLink
              icon={Mail}
              label="Email Address"
              value={user?.email || "sarah@greencoin.com"}
              colorClass="bg-blue-500"
            />
            <SettingLink
              icon={Smartphone}
              label="Connected Phone"
              value="+1 (555) 000-1111"
              colorClass="bg-indigo-500"
            />
            <SettingLink
              icon={ShieldCheck}
              label="Security Check"
              value="Passcode & Biometrics"
              colorClass="bg-emerald-500"
            />
          </div>
        </section>

        {/* Global Section */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">
            Global Preferences
          </h3>
          <div className="space-y-4">
            <SettingToggle
              icon={preferences.darkTheme ? Moon : Sun}
              label="Dark Ecosystem"
              status={preferences.darkTheme}
              onClick={toggleTheme}
              colorClass="bg-amber-500"
            />
            <SettingToggle
              icon={Bell}
              label="Instant Alerts"
              status={preferences.notificationsEnabled}
              onClick={() => {}}
              colorClass="bg-rose-500"
            />
            <SettingToggle
              icon={MapPin}
              label="Impact Map Sharing"
              status={preferences.locationSharing}
              onClick={() => {}}
              colorClass="bg-cyan-500"
            />
          </div>
        </section>

        {/* Support Section */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">
            Help & Support
          </h3>
          <div className="space-y-4">
            <SettingLink
              icon={Globe}
              label="Help Center"
              value="guides.greencoin.com"
              colorClass="bg-slate-900"
            />
            <SettingLink
              icon={Heart}
              label="Donate Green"
              value="Support our mission"
              colorClass="bg-rose-600"
            />
            <SettingLink
              icon={Info}
              label="Privacy Policy"
              value="v1.4.2 stable"
              colorClass="bg-slate-400"
            />
          </div>
        </section>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 p-8 rounded-[3rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all active:scale-[0.98] mt-12 mb-12 shadow-inner border border-rose-100"
        >
          <LogOut size={24} /> Terminate Session
        </button>
      </div>
    </motion.div>
  );
};

export default Settings;
