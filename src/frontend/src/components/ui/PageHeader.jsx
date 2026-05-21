import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageHeader({ title, description, actions }) {
  return (
    <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-on-muted dark:text-slate-400">
          <Link className="flex items-center gap-1 hover:text-primary dark:hover:text-white" to="/dashboard">
            <Home size={14} /> MeasurePro
          </Link>
          <ChevronRight size={14} />
          <span>{title}</span>
        </nav>
        <h1 className="text-3xl font-black tracking-normal text-primary dark:text-white sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-base text-on-muted dark:text-slate-300">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
