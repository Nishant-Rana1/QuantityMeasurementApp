import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeftRight, Clipboard, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import { Input, Select } from "../../components/ui/Input.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { convertQuantity } from "../../services/quantityService.js";
import { categoryOptions, defaultUnit, UNIT_CATEGORIES, unitLabel } from "../../utils/units.js";
import { formatNumber } from "../../utils/format.js";

export default function Converter() {
  const [params] = useSearchParams();
  const initialCategory = params.get("category") || "LENGTH";
  const [category, setCategory] = useState(UNIT_CATEGORIES[initialCategory] ? initialCategory : "LENGTH");
  const [fromValue, setFromValue] = useState("1");
  const [fromUnit, setFromUnit] = useState(defaultUnit(category, 0));
  const [toUnit, setToUnit] = useState(defaultUnit(category, 1));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const units = useMemo(() => UNIT_CATEGORIES[category].units, [category]);

  useEffect(() => {
    setFromUnit(defaultUnit(category, 0));
    setToUnit(defaultUnit(category, 1));
    setResult(null);
  }, [category]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (fromValue !== "" && Number.isFinite(Number(fromValue))) handleConvert(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [fromValue, fromUnit, toUnit, category]);

  async function handleConvert(silent = false) {
    if (fromValue === "" || !Number.isFinite(Number(fromValue))) {
      notify("Enter a valid numeric value.", "error");
      return;
    }
    setLoading(true);
    try {
      const data = await convertQuantity({ category, fromValue, fromUnit, toUnit, targetUnit: toUnit });
      setResult(data);
      if (!silent) notify("Conversion completed.", "success");
    } catch (error) {
      if (!silent) notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result?.value !== undefined) setFromValue(String(result.value));
  }

  return (
    <>
      <PageHeader title="Unit Conversion" description="Run real-time conversions." />
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(UNIT_CATEGORIES).map(([key, item]) => {
          const Icon = item.icon;
          return (
            <button key={key} onClick={() => setCategory(key)} className={`glass-card flex items-center gap-4 rounded-xl p-4 text-left transition hover:-translate-y-1 ${category === key ? "border-t-2 border-t-primary shadow-float" : ""}`}>
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon /></span>
              <span><span className="block text-xs font-bold uppercase tracking-[0.18em] text-primary-accent">{item.eyebrow}</span><span className="text-lg font-black text-primary dark:text-white">{item.label}</span></span>
            </button>
          );
        })}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_auto_1fr]">
        <Card>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-on-muted">From</p>
          <div className="space-y-4">
            <Select label="Category" options={categoryOptions} value={category} onChange={(event) => setCategory(event.target.value)} />
            <Input label="Value" type="number" value={fromValue} onChange={(event) => setFromValue(event.target.value)} />
            <Select label="Unit" options={units} value={fromUnit} onChange={(event) => setFromUnit(event.target.value)} />
          </div>
        </Card>
        <div className="flex items-center justify-center">
          <Button className="h-14 w-14 rounded-full p-0" onClick={swap} aria-label="Swap units"><ArrowLeftRight /></Button>
        </div>
        <Card>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-on-muted">To</p>
          <div className="space-y-4">
            <Select label="Target unit" options={units} value={toUnit} onChange={(event) => setToUnit(event.target.value)} />
            <motion.div key={`${result?.value}-${toUnit}`} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-lg border border-outline bg-surface-muted p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-accent">Live preview</p>
              <p className="mt-2 break-words text-4xl font-black text-primary dark:text-white">{loading ? "..." : formatNumber(result?.value)} <span className="text-xl">{result?.unit || toUnit}</span></p>
              <p className="mt-2 text-sm text-on-muted dark:text-slate-300">{unitLabel(fromUnit)} to {unitLabel(toUnit)}</p>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => handleConvert(false)} disabled={loading}>Convert</Button>
              <Button variant="secondary" onClick={() => navigator.clipboard.writeText(`${formatNumber(result?.value)} ${result?.unit || toUnit}`)}><Clipboard size={18} /> Copy</Button>
              <Button variant="ghost" onClick={() => { setFromValue("1"); setResult(null); }}><RotateCcw size={18} /> Reset</Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
