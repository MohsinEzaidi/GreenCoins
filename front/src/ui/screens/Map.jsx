import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { MapPin, Navigation, Info, X, Star, Leaf } from "lucide-react";

// Custom icon setup
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const recyclingCenters = [
  {
    id: 1,
    name: "City Eco-Center",
    lat: 48.8566,
    lng: 2.3522,
    type: "Plastic, Paper, Glass",
    rating: 4.8,
  },
  {
    id: 2,
    name: "GreenPoint West",
    lat: 48.8606,
    lng: 2.3376,
    type: "Textiles, Electronics",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Seine Recycling Hub",
    lat: 48.8534,
    lng: 2.3488,
    type: "Hazardous Waste",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Marais Eco-Bin",
    lat: 48.8596,
    lng: 2.3582,
    type: "Mixed Recyclables",
    rating: 4.2,
  },
];

const Map = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [userLocation, setUserLocation] = useState([48.8566, 2.3522]);

  return (
    <div className="relative h-screen w-full bg-slate-100 overflow-hidden">
      {/* Header Info */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex flex-col gap-3">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] border border-white shadow-xl flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500 text-white">
            <MapPin size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-black text-slate-900 truncate">
              Near Paris, France
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              4 Centers Available
            </p>
          </div>
          <button className="p-2.5 rounded-2xl bg-slate-100 text-slate-500 active:scale-90 transition-transform">
            <Navigation size={20} />
          </button>
        </div>

        {/* Categories Chip Scroller */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {["All", "Plastic", "Glass", "E-Waste", "Textiles"].map((cat, i) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-md border ${
                i === 0
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <MapContainer
        center={userLocation}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
        />
        {recyclingCenters.map((center) => (
          <Marker
            key={center.id}
            position={[center.lat, center.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedCenter(center),
            }}
          />
        ))}
      </MapContainer>

      {/* Center Details Sheet */}
      <AnimatePresence>
        {selectedCenter && (
          <motion.div
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            className="absolute bottom-24 left-4 right-4 z-[1000] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {selectedCenter.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-xl text-[10px] font-black">
                    <Star size={12} fill="currentColor" />
                    {selectedCenter.rating}
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Open until 8:00 PM
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCenter(null)}
                className="p-2.5 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 border-y border-slate-50 py-4">
              <div className="flex flex-col flex-1 gap-1">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  Accepted Waste
                </span>
                <p className="text-xs font-bold text-slate-600">
                  {selectedCenter.type}
                </p>
              </div>
              <div className="flex flex-col text-right gap-1">
                <span className="text-[10px] uppercase font-black text-emerald-500 tracking-wider">
                  Bonus GC
                </span>
                <p className="text-xs font-black text-emerald-600">
                  +1.5x Multiplier
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-3xl shadow-xl shadow-emerald-100 active:scale-95 transition-transform flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                <Navigation size={18} /> Get Directions
              </button>
              <button className="p-4 bg-emerald-100 text-emerald-600 rounded-3xl active:scale-95 transition-transform shadow-lg shadow-emerald-50">
                <Leaf size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Map;
