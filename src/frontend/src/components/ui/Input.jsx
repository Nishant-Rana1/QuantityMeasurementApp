export function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-semibold text-primary dark:text-slate-200">{label}</span>}
      <input
        className={`focus-ring h-12 w-full rounded-lg border border-outline bg-white px-4 text-base text-primary shadow-sm transition placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      />
    </label>
  );
}

export function Select({ label, options, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-semibold text-primary dark:text-slate-200">{label}</span>}
      <select
        className={`focus-ring h-12 w-full rounded-lg border border-outline bg-white px-4 text-base text-primary shadow-sm transition dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
