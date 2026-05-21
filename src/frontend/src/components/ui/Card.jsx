export default function Card({ className = "", children, as: Element = "section" }) {
  return (
    <Element className={`glass-card rounded-xl p-5 text-on-surface dark:text-slate-100 ${className}`}>
      {children}
    </Element>
  );
}
