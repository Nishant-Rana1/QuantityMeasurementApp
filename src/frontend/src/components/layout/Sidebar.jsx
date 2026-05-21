import { Calculator, Home, Scale3d, SquareCode, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/converter", label: "Converter", icon: SquareCode },
  { to: "/calculator", label: "Arithmetic", icon: Calculator },
  { to: "/comparison", label: "Comparison", icon: Scale3d },
];

function NavItem({ item, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all duration-200 rounded-xl border-l-4 ${
          isActive
            ? "bg-indigo-50/80 text-indigo-600 border-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-500"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/40"
        }`
      }
    >
      <Icon size={19} className="shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  );
}


export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const content = (
    <>
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white">
            <SquareCode size={24} />
          </div>
          <div>
            <p className="text-xl font-black text-primary dark:text-white">MeasurePro</p>
            <p className="text-xs font-semibold text-on-muted dark:text-slate-400">Professional Suite</p>
          </div>
        </div>
        <button className="md:hidden" aria-label="Close navigation" onClick={() => setMobileOpen(false)}>
          <X size={22} />
        </button>
      </div>
      <nav className="flex-1 space-y-2 px-4">
        {items.map((item) => <NavItem key={item.to} item={item} onClick={() => setMobileOpen(false)} />)}
      </nav>
    </>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline bg-surface-muted shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
        {content}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 md:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="flex h-full w-80 max-w-[86vw] flex-col bg-surface-muted shadow-float dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
