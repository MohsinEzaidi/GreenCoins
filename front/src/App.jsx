import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  PlusCircle,
  Gift,
  History,
  User,
  Trophy,
  Map as MapIcon,
  QrCode,
  BarChart3,
  BookOpen,
  Bell,
  Settings as SettingsIcon,
  Heart,
  Target,
  LayoutGrid,
} from "lucide-react";
import { useStore } from "./viewmodel/useStore";

import Analytics from "./ui/screens/Analytics";
import Challenge from "./ui/screens/Challenge";

// Lazy loaded screens
const Home = lazy(() => import("./ui/screens/Home"));
const Login = lazy(() => import("./ui/screens/Login"));
const Register = lazy(() => import("./ui/screens/Register"));
const AddAction = lazy(() => import("./ui/screens/AddAction"));
const Rewards = lazy(() => import("./ui/screens/Rewards"));
const TransactionHistory = lazy(
  () => import("./ui/screens/TransactionHistory"),
);
const Profile = lazy(() => import("./ui/screens/Profile"));
const Leaderboard = lazy(() => import("./ui/screens/Leaderboard"));
const ImpactMap = lazy(() => import("./ui/screens/Map"));
const QRScan = lazy(() => import("./ui/screens/QRScan"));
const EcoTips = lazy(() => import("./ui/screens/EcoTips"));
const Notifications = lazy(() => import("./ui/screens/Notifications"));
const Settings = lazy(() => import("./ui/screens/Settings"));
const Donations = lazy(() => import("./ui/screens/Donations"));

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="flex flex-col items-center gap-1.5 relative group">
      <div
        className={`p-3 rounded-2xl transition-all duration-300 ${
          isActive
            ? "bg-emerald-500 text-white shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] scale-110"
            : "text-slate-400 group-hover:bg-slate-50"
        }`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span
        className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${
          isActive
            ? "opacity-100 text-emerald-600"
            : "opacity-40 text-slate-400"
        }`}
      >
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute -top-1 w-1 h-1 bg-emerald-500 rounded-full"
        />
      )}
    </Link>
  );
};

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  return children;
};

const NavWrapper = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const noNavRoutes = ["/login", "/register", "/scan"];

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  if (noNavRoutes.includes(location.pathname)) return null;

  return (
    <>
      <div className="h-28" /> {/* Nav Spacer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[2000]"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-[130px] inset-x-6 flex justify-center z-[3000] pointer-events-none"
            >
              <div className="w-full max-w-sm bg-white/95 backdrop-blur-3xl rounded-[3rem] p-8 sm:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-white flex flex-col items-center gap-8 pointer-events-auto">
                <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-2" />
                <div className="grid grid-cols-3 gap-y-10 gap-x-6 w-full">
                  <MenuAction
                    to="/profile"
                    icon={User}
                    label="Profile"
                    color="bg-blue-500"
                    shadow="shadow-blue-500/25"
                  />
                  <MenuAction
                    to="/leaderboard"
                    icon={Trophy}
                    label="Ranks"
                    color="bg-amber-500"
                    shadow="shadow-amber-500/25"
                  />
                  <MenuAction
                    to="/map"
                    icon={MapIcon}
                    label="Centers"
                    color="bg-emerald-500"
                    shadow="shadow-emerald-500/25"
                  />
                  <MenuAction
                    to="/scan"
                    icon={QrCode}
                    label="Scan QR"
                    color="bg-indigo-500"
                    shadow="shadow-indigo-500/25"
                  />
                  <MenuAction
                    to="/analytics"
                    icon={BarChart3}
                    label="Impact"
                    color="bg-rose-500"
                    shadow="shadow-rose-500/25"
                  />
                  <MenuAction
                    to="/tips"
                    icon={BookOpen}
                    label="Library"
                    color="bg-cyan-500"
                    shadow="shadow-cyan-500/25"
                  />
                  <MenuAction
                    to="/notifications"
                    icon={Bell}
                    label="Inbox"
                    color="bg-violet-500"
                    shadow="shadow-violet-500/25"
                  />
                  <MenuAction
                    to="/donations"
                    icon={Heart}
                    label="Social"
                    color="bg-red-500"
                    shadow="shadow-red-500/25"
                  />
                  <MenuAction
                    to="/settings"
                    icon={SettingsIcon}
                    label="Config"
                    color="bg-slate-900"
                    shadow="shadow-slate-900/25"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <nav className="fixed bottom-0 inset-x-0 flex justify-center z-[4000] p-4 sm:p-6 pb-8 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xl px-4 sm:px-8 py-4 sm:py-5 rounded-[2rem] sm:rounded-[2.5rem] flex justify-between items-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white pointer-events-auto ring-1 ring-slate-900/5 w-full max-w-md">
          <NavItem to="/" icon={HomeIcon} label="Home" />
          <NavItem to="/challenges" icon={Target} label="Goals" />

          <Link to="/add" className="relative -top-12">
            <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center text-white shadow-2xl scale-125 active:scale-95 transition-transform border-[6px] border-white ring-4 ring-emerald-500/10 group">
              <PlusCircle
                size={28}
                className="group-hover:rotate-90 transition-transform duration-500"
              />
            </div>
          </Link>

          <NavItem to="/rewards" icon={Gift} label="Shop" />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center gap-1 transition-all active:scale-95 ${isMenuOpen ? "text-emerald-600 scale-110" : "text-slate-400"}`}
          >
            <div
              className={`p-3 rounded-2xl transition-all ${isMenuOpen ? "bg-emerald-500 text-white shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]" : "bg-slate-50"}`}
            >
              <LayoutGrid size={24} strokeWidth={isMenuOpen ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
              Extra
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

const MenuAction = ({ to, icon: Icon, label, color, shadow }) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-2.5 group transition-all duration-300"
  >
    <div
      className={`w-14 h-14 ${color} ${shadow} rounded-[22px] flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 active:scale-90`}
    >
      <Icon size={26} strokeWidth={2.5} />
    </div>
    <span className="text-[11px] font-black tracking-widest text-slate-400 uppercase group-hover:text-slate-900 transition-colors">
      {label}
    </span>
  </Link>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100/50 font-['Inter'] selection:bg-emerald-100 selection:text-emerald-700">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-[0_0_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-t-2 border-emerald-500 border-solid rounded-full animate-spin"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <TransactionHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddAction />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <ImpactMap />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scan"
                element={
                  <ProtectedRoute>
                    <QRScan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tips"
                element={
                  <ProtectedRoute>
                    <EcoTips />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donations"
                element={
                  <ProtectedRoute>
                    <Donations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenges"
                element={
                  <ProtectedRoute>
                    <Challenge />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          <NavWrapper />
        </div>
      </div>
    </Router>
  );
}
