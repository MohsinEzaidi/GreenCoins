import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Leaf, Droplet, CloudRain, ArrowUpRight, ArrowRight } from "lucide-react";

const data = [
  { name: "Mon", value: 45 }, { name: "Tue", value: 52 }, { name: "Wed", value: 38 },
  { name: "Thu", value: 65 }, { name: "Fri", value: 89 }, { name: "Sat", value: 72 }, { name: "Sun", value: 95 },
];

const categoryData = [
  { name: "Plastic", value: 400, color: "#10b981" },
  { name: "Paper", value: 300, color: "#3b82f6" },
  { name: "Glass", value: 200, color: "#f59e0b" },
];

const ImpactMetric = ({ icon: Icon, label, value, unit, trend, colorClass, textColor }) => (
  <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-4 group">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-10 text-${textColor}`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-xl text-[10px] font-black">
        <ArrowUpRight size={12} /> {trend}
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      <div className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
        {value} <span className="text-sm font-bold opacity-40 uppercase">{unit}</span>
      </div>
    </div>
  </div>
);

export default function Analytics() {
  return (
    <div className="p-6 pb-32 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tightest uppercase italic">Impact Stats</h1>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Visualizing your eco journey</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ImpactMetric icon={Droplet} label="Water Saved" value="1.2k" unit="L" trend="+12%" colorClass="bg-blue-500" textColor="blue-500" />
        <ImpactMetric icon={CloudRain} label="CO2 Offset" value="840" unit="G" trend="+32%" colorClass="bg-emerald-500" textColor="emerald-500" />
      </div>

      <div className="bg-slate-950 p-8 rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white tracking-widest uppercase">Weekly Activity</h3>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl text-white"><TrendingUp size={20} /></div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
           <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600"><Leaf size={20} /></div>
           <h3 className="text-lg font-black text-slate-900 tracking-tightest uppercase">Legacy</h3>
        </div>
        <div className="space-y-3">
          {categoryData.map(cat => (
            <div key={cat.name} className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">{cat.name}</span>
              <span className="text-sm font-black text-slate-900">{cat.value} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
