import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  User,
  TrendingUp,
  Leaf,
  Droplet,
  CloudRain,
  Globe,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  X,
} from "lucide-react";
import { useStore } from "../../viewmodel/useStore";
import ReactConfetti from "react-confetti";

const charities = [
  {
    id: 1,
    name: "Amazon Reforestation",
    desc: "Planting native trees to restore critical biodiversity in the Amazon rainforest.",
    target: 500000,
    current: 425900,
    minDonation: 100,
    impact: "1 Tree / 500 GC",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=400",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Ocean Plastic Cleanup",
    desc: "Using advanced boom technology to remove Great Pacific Garbage Patch plastics.",
    target: 250000,
    current: 180200,
    minDonation: 250,
    impact: "1kg Plastic / 250 GC",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=400",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Coral Reef Recovery",
    desc: "3D printing coral structures to revive dying reefs in the Great Barrier Reef.",
    target: 100000,
    current: 92400,
    minDonation: 500,
    impact: "1 Coral / 1000 GC",
    image:
      "https://images.unsplash.com/photo-1546026423-cc4642628d21?auto=format&fit=crop&q=80&w=400",
    color: "bg-orange-500",
  },
];

const DonationCard = ({ charity, onDonate }) => {
  const progress = (charity.current / charity.target) * 100;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-xl group flex flex-col h-full"
    >
      <div className="relative h-56 w-full">
        <img
          src={charity.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
          <MapPin size={12} /> Global Impact
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {charity.name}
          </h3>
          <p className="text-sm font-bold text-slate-400 line-clamp-2">
            {charity.desc}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">
                Goal Reached
              </span>
              <span className="text-xl font-black text-slate-900">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">
                Impact Rate
              </span>
              <span className="text-sm font-black text-emerald-600 uppercase tracking-widest">
                {charity.impact}
              </span>
            </div>
          </div>
          <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full ${charity.color} shadow-lg shadow-current/20`}
            />
          </div>
        </div>

        <button
          onClick={() => onDonate(charity)}
          className="w-full py-5 bg-slate-950 hover:bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl group-hover:shadow-emerald-500/10 shadow-slate-950/10"
        >
          <Heart size={18} className="group-hover:fill-current" /> Donate
          GreenCoins
        </button>
      </div>
    </motion.div>
  );
};

const Donations = () => {
  const { balance } = useStore();
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDonate = (charity) => {
    if (balance < charity.minDonation) {
      alert("Insufficient Balance");
      return;
    }
    setSelectedCharity(charity);
  };

  const confirmDonation = () => {
    // mock donation logic
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setSelectedCharity(null);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pb-24 space-y-10"
    >
      {showConfetti && (
        <ReactConfetti
          numberOfPieces={300}
          recycle={false}
          gravity={0.15}
          colors={["#10b981", "#3b82f6", "#f59e0b"]}
        />
      )}

      <div className="flex flex-col gap-2 pt-4 text-center">
        <div className="self-center p-4 bg-rose-50 text-rose-500 rounded-3xl mb-4 shadow-inner ring-8 ring-rose-500/5">
          <Shield size={48} strokeWidth={1} />
        </div>
        <h1 className="text-4xl font-black text-slate-950 tracking-tightest">
          Philanthropy
        </h1>
        <p className="text-slate-500 font-bold text-sm max-w-xs mx-auto">
          Convert your impact into real-world change for humanitarian projects.
        </p>
      </div>

      {/* Categories Horizontal */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        {["Forests", "Oceans", "Wildlife", "E-Waste", "Social"].map((cat) => (
          <button
            key={cat}
            className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10">
        {charities.map((charity) => (
          <DonationCard
            key={charity.id}
            charity={charity}
            onDonate={handleDonate}
          />
        ))}
      </div>

      {/* Donation Modal */}
      <AnimatePresence>
        {selectedCharity && !showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              className="bg-white w-full max-w-md rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden text-center shadow-3xl"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                  Select Amount
                </span>
                <h3 className="text-3xl font-black text-slate-950">
                  {selectedCharity.name}
                </h3>
                <p className="text-xs font-bold text-slate-400">
                  Your donation will directly support{" "}
                  {selectedCharity.name.toLowerCase()}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[500, 1000, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-emerald-50 hover:border-emerald-100 group transition-all"
                  >
                    <span className="text-2xl font-black text-slate-950 group-hover:text-emerald-600">
                      {amt}
                    </span>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mt-1">
                      GreenCoins
                    </p>
                  </button>
                ))}
              </div>

              <div className="bg-emerald-950 p-8 rounded-[2.5rem] space-y-4 shadow-2xl">
                <div className="flex items-center justify-between text-white/50 text-[10px] font-black uppercase tracking-widest">
                  <span>Personal Balance</span>
                  <span className="text-white">{balance} GC</span>
                </div>
                <button
                  onClick={confirmDonation}
                  className="w-full py-5 bg-emerald-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
                >
                  Confirm Donation
                </button>
                <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest text-center italic">
                  Thank you for being a green warrior
                </p>
              </div>

              <button
                onClick={() => setSelectedCharity(null)}
                className="p-4 text-slate-300 hover:text-rose-500 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Donations;
