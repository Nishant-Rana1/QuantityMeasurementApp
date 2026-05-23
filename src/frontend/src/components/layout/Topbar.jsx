import { useEffect, useState } from "react";
import { LogIn, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function Topbar({ onMenu }) {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function loadUser() {
      const stored = localStorage.getItem("measurepro_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("measurepro_user");
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/logout";
  };

  const getInitials = (name) => {
    if (!name) return "MP";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-white/40 bg-gradient-to-r from-primary-container via-primary-accent/70 to-background shadow-sm dark:to-slate-950 md:left-64">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button className="focus-ring rounded-lg p-2 text-primary md:hidden" aria-label="Open navigation" onClick={onMenu}>
            <Menu size={24} />
          </button>
          <p className="hidden text-lg font-black text-primary dark:text-white sm:block">Quantity Measurement Workspace</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="focus-ring rounded-lg p-2 text-primary hover:bg-white/50 dark:text-white" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={21} /> : <Moon size={21} />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-xs font-black text-white shadow-sm border border-outline hover:ring-2 hover:ring-primary/20 focus:outline-none"
              >
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  getInitials(user.name)
                )}
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 z-50 w-56 rounded-xl border border-outline bg-white p-2 shadow-float dark:border-slate-800 dark:bg-slate-900">
                    <div className="px-3 py-2 border-b border-outline dark:border-slate-800">
                      <p className="text-sm font-bold text-primary dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-on-muted dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-danger hover:bg-danger-soft transition"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <a
              href={`${import.meta.env.VITE_API_BASE_URL || window.location.origin}/oauth2/authorization/google`}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-black text-white shadow-sm hover:bg-primary-soft transition"
            >
              <LogIn size={15} />
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
