import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  Leaf,
  TrendingUp,
  Search,
  X,
  ThumbsUp,
  MessageCircle,
  Share2,
  ArrowRight,
  Filter,
} from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Micro-Composting at Home",
    desc: "You don't need a backyard to compost. Micro-bins are perfect for small apartments.",
    category: "Home",
    color: "emerald",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 2,
    title: "Switching to Bamboo Products",
    desc: "Bamboo grows 30x faster than trees, making it the most sustainable wood alternative.",
    category: "Store",
    color: "amber",
    image:
      "https://images.unsplash.com/photo-1600109918239-0143899f91eb?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 3,
    title: "Understanding Recycling Codes",
    desc: "Not all plastics are equal. Learn which numbers (1-7) your local center actually takes.",
    category: "Guide",
    color: "blue",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 4,
    title: "The Impact of Fast Fashion",
    desc: "Did you know it takes 2,700 liters of water to make just one cotton t-shirt?",
    category: "Insight",
    color: "rose",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: 5,
    title: "Cold Water Washing",
    desc: "90% of a washing machine's energy goes to heating water. Switch to cold!",
    category: "Home",
    color: "cyan",
    image:
      "https://images.unsplash.com/photo-1545173168-9f1947eeba01?auto=format&fit=crop&q=80&w=300",
  },
];

const CategoryChip = ({ name, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${
      active
        ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-100"
        : "bg-white text-slate-400 border-white shadow-sm scale-95 hover:border-slate-100 hover:text-slate-600"
    }`}
  >
    {name}
  </button>
);

const EcoTips = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = tips.filter(
    (t) =>
      (filter === "All" || t.category === filter) &&
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pb-24 space-y-8"
    >
      {/* Header & Search */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Eco Library
          </h1>
          <p className="text-slate-500 font-bold text-sm">
            Actionable steps for a greener future.
          </p>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for tips, guides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-none px-14 py-5 rounded-[2.5rem] text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-2">
          {["All", "Home", "Store", "Guide", "Insight"].map((cat) => (
            <CategoryChip
              key={cat}
              name={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
            />
          ))}
        </div>
      </div>

      {/* Featured Card */}
      <div className="relative h-64 w-full rounded-[3.5rem] overflow-hidden group shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm self-start px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white ring-4 ring-white/10">
            <Lightbulb size={12} fill="currentColor" /> Featured Guide
          </div>
          <h3 className="text-xl font-black text-white leading-tight">
            Zero Waste Living: A Newbie's Guide to 2026
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex -space-x-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna"
                className="w-6 h-6 rounded-full border border-white"
              />
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
                className="w-6 h-6 rounded-full border border-white"
              />
            </div>
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
              12k users read this
            </span>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center justify-between">
          Daily Insights
          <Filter size={18} className="text-slate-300" />
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((tip, index) => (
              <motion.div
                key={tip.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-[3rem] border border-slate-100 shadow-sm flex gap-6 group hover:shadow-xl transition-all"
              >
                <div className="w-32 h-32 flex-shrink-0 rounded-[2.5rem] overflow-hidden shadow-lg group-hover:rotate-3 transition-transform">
                  <img
                    src={tip.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">
                      {tip.category}
                    </span>
                    <h4 className="text-lg font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                      {tip.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 line-clamp-2 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-500 transition-colors">
                        <ThumbsUp size={16} />{" "}
                        <span className="text-[10px] font-bold">1.2k</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-slate-300 hover:text-blue-500 transition-colors">
                        <MessageCircle size={16} />{" "}
                        <span className="text-[10px] font-bold">84</span>
                      </button>
                    </div>
                    <button className="p-2 bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white rounded-xl transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default EcoTips;
