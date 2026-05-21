import { motion } from "framer-motion";
export default function CategoryCard({ category, selected, onClick }) {
  const Icon = category.icon;
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass-card group flex min-h-40 flex-col items-start rounded-xl p-5 text-left transition ${selected ? "border-t-2 border-t-primary shadow-float" : "hover:border-primary-accent"}`}
    >
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
        <Icon size={25} />
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary dark:text-primary-accent">{category.eyebrow}</span>
      <h3 className="mt-2 text-2xl font-black text-primary dark:text-white">{category.label}</h3>
      <span className="mt-auto text-sm font-bold text-primary-accent group-hover:text-primary dark:group-hover:text-white">
        Quick convert
      </span>
    </motion.button>
  );
}
