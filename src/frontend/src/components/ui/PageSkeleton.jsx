export default function PageSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading page">
      <div className="h-8 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
