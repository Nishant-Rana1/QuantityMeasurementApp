import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LogIn, LogOut, Menu, Moon, Sun, Home, SquareCode, Calculator, Scale3d, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar({ onMenu }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const getPageTitleAndIcon = () => {
    const path = location.pathname;
    if (path.startsWith("/dashboard") || path.startsWith("/home")) {
      return { title: "Dashboard", icon: <Home size={18} className="text-indigo-500" /> };
    } else if (path.startsWith("/converter")) {
      return { title: "Converter", icon: <SquareCode size={18} className="text-violet-500" /> };
    } else if (path.startsWith("/calculator")) {
      return { title: "Arithmetic Calculator", icon: <Calculator size={18} className="text-pink-500" /> };
    } else if (path.startsWith("/comparison")) {
      return { title: "Unit Comparison", icon: <Scale3d size={18} className="text-emerald-500" /> };
    }
    return { title: "MeasurePro Workspace", icon: <SquareCode size={18} className="text-indigo-500" /> };
  };

  const { title, icon } = getPageTitleAndIcon();

  const getInitials = (name) => {
    if (!name) return "MP";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 transition-all duration-300 md:left-64">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
        {/* Left Side: Mobile Menu Trigger & Context Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-2 px-1.5 py-1 rounded-lg">
            {icon}
            <span className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
              {title}
            </span>
          </div>
        </div>

        {/* Right Side: Theme & Auth controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>

          {/* User profile details / Google Login button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition duration-150 active:scale-[0.98]"
              >
                <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-indigo-600 text-[10px] font-black text-white shrink-0">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <span className="hidden sm:block text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2.5 z-50 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3.5 py-3 border-b border-slate-100 dark:border-slate-800/60">
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">SIGNED IN AS</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate mt-0.5">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                    </div>
                    
                    <div className="p-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition duration-150"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-150 active:scale-95"
            >
              {/* Google Mini Logo */}
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.17-.23-.3-.48-.39-.75z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
