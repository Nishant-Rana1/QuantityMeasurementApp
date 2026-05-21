import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface dark:bg-slate-950 dark:text-slate-100">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Navbar onMenu={() => setMobileOpen(true)} />
      <main className="mx-auto max-w-[1440px] px-4 pb-12 pt-24 md:ml-64 md:px-8">
        {children}
      </main>
    </div>
  );
}

