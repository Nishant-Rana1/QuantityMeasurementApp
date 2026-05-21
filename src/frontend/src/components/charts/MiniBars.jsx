export default function MiniBars({ data = [] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-semibold text-primary dark:text-slate-200">{item.label}</span>
            <span className="text-on-muted dark:text-slate-400">{item.value}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary-container dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-accent transition-all"
              style={{ width: `${Math.max(8, (item.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
