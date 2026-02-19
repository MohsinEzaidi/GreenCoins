import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Camera,
  Scan,
  Sparkles,
  X,
  CheckCircle2,
  History,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../viewmodel/useStore";
import ReactConfetti from "react-confetti";

const QRScan = () => {
  const [scanning, setScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [points, setPoints] = useState(0);
  const { addTransaction } = useStore();
  const navigate = useNavigate();

  const handleScan = () => {
    setScanning(true);
    // Simulated scan delay
    setTimeout(() => {
      setScanning(false);
      const earned = 50; // mock points
      setPoints(earned);
      setShowSuccess(true);
      addTransaction({ type: "Scan Event", quantity: 1, amount: earned }); // simulate a scan event
    }, 2500);
  };

  return (
    <div className="relative h-screen bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 text-white pb-24">
      {showSuccess && (
        <ReactConfetti numberOfPieces={200} recycle={false} gravity={0.1} />
      )}

      {/* Header Info */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl text-white border border-white/10"
        >
          <X size={20} />
        </button>
        <div className="flex bg-white/10 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 gap-2">
          <button className="px-4 py-2 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
            Scan Code
          </button>
          <button className="px-4 py-2 text-white/50 rounded-xl font-black text-[10px] uppercase tracking-widest">
            Type ID
          </button>
        </div>
        <button className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl text-white border border-white/10">
          <History size={24} />
        </button>
      </div>

      <AnimatePresence>
        {!showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-sm space-y-12"
          >
            {/* Instruction Text */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-black tracking-tight">
                Scan QR to Earn
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Position the code within the frame below
              </p>
            </div>

            {/* Scanner Viewport */}
            <div className="relative aspect-square w-full">
              {/* Outer Corners Frame */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-[3rem]" />

              {/* Animated Scan Line */}
              {scanning && (
                <motion.div
                  initial={{ top: "10%" }}
                  animate={{ top: "90%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute left-4 right-4 h-1 bg-emerald-400 shadow-[0_0_25px_emerald_0.8] z-10 rounded-full"
                />
              )}

              {/* Central Box / Focus Area */}
              <div className="absolute inset-8 rounded-[2.5rem] border-4 border-emerald-500 overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)]">
                {/* Simulated Camera Feed Background (Mesh Gradient) */}
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 opacity-20 blur-3xl bg-emerald-500 rounded-full"
                  />
                  {!scanning ? (
                    <Scan
                      size={120}
                      strokeWidth={0.5}
                      className="text-emerald-500/30"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 animate-pulse">
                        Analyzing...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Decor Hooks */}
              <div className="absolute -top-1 -left-1 w-12 h-12 border-t-8 border-l-8 border-white rounded-tl-3xl shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
              <div className="absolute -top-1 -right-1 w-12 h-12 border-t-8 border-r-8 border-white rounded-tr-3xl shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
              <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-8 border-l-8 border-white rounded-bl-3xl shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
              <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-8 border-r-8 border-white rounded-br-3xl shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
            </div>

            <div className="space-y-4">
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 ring-8 ring-emerald-500/20"
              >
                <Camera size={20} /> Start Scanning
              </button>

              <div className="flex items-center justify-center gap-3 text-white/40 text-[10px] font-bold py-2">
                <AlertCircle size={14} /> Only scan official GreenCoin QR codes
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[3rem] p-8 w-full max-w-sm text-slate-950 flex flex-col items-center text-center space-y-6 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center shadow-lg border-b-8 border-emerald-500 scale-110">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                Great Job!
              </h2>
              <p className="text-slate-500 font-bold text-sm">
                You’ve earned some eco-wealth.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 w-full py-6 rounded-3xl flex flex-col gap-1 shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                Points Added
              </span>
              <div className="text-5xl font-black text-emerald-700 flex items-center justify-center gap-2">
                +{points}{" "}
                <span className="text-lg font-black text-emerald-500">GC</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-transform uppercase tracking-widest text-xs"
            >
              Continue Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRScan;
