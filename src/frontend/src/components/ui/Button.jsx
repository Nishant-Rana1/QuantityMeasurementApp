export default function Button({ variant = "primary", className = "", children, as, ...props }) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-container shadow-sm",
    secondary: "bg-secondary-container text-primary hover:bg-primary-soft",
    ghost: "bg-transparent text-on-muted hover:bg-surface-muted dark:text-slate-300 dark:hover:bg-slate-800",
    danger: "bg-red-50 text-danger hover:bg-red-100 dark:bg-red-950/40",
  };

  const Element = as || "button";

  return (
    <Element
      className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}
