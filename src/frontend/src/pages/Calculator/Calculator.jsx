import { useEffect, useMemo, useState } from "react";
import { Divide, Minus, Plus, X } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select } from "../../components/ui/Input.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { arithmeticOperation } from "../../services/quantityService.js";
import { categoryOptions, defaultUnit, UNIT_CATEGORIES } from "../../utils/units.js";
import { formatNumber } from "../../utils/format.js";

const operations = [
  { id: "add", label: "Add", symbol: "+", icon: Plus },
  { id: "subtract", label: "Subtract", symbol: "-", icon: Minus },
  { id: "multiply", label: "Multiply", symbol: "*", icon: X },
  { id: "divide", label: "Divide", symbol: "/", icon: Divide },
];

export default function Calculator() {
  const [category, setCategory] = useState("LENGTH");
  const [unitA, setUnitA] = useState(defaultUnit("LENGTH", 0));
  const [unitB, setUnitB] = useState(defaultUnit("LENGTH", 1));
  const [valueA, setValueA] = useState("12");
  const [valueB, setValueB] = useState("4");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const units = useMemo(() => UNIT_CATEGORIES[category].units, [category]);
  const active = operations.find((item) => item.id === operation);

  useEffect(() => {
    setUnitA(defaultUnit(category, 0));
    setUnitB(defaultUnit(category, 1));
  }, [category]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Enter") execute();
      if (["+", "-", "*", "/"].includes(event.key)) {
        const matched = operations.find((item) => item.symbol === event.key);
        if (matched) setOperation(matched.id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  async function execute() {
    if (![valueA, valueB].every((value) => value !== "" && Number.isFinite(Number(value)))) {
      notify("Both operands must be valid numbers.", "error");
      return;
    }
    setLoading(true);
    try {
      const data = await arithmeticOperation(operation, {
        category,
        fromValue: valueA,
        fromUnit: unitA,
        toValue: valueB,
        toUnit: unitB,
        targetUnit: unitA,
      });
      setResult(data);
      notify("Operation completed.", "success");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Arithmetic Suite" description="Calculator-style arithmetic operations." />
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="mb-6 flex flex-col gap-4 border-b border-outline pb-5 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-primary dark:text-white">Precision Calculator</h2>
              <p className="text-on-muted dark:text-slate-300">Use Enter to execute and operator keys to switch modes.</p>
            </div>
            <span className="w-fit rounded-full bg-secondary-container px-4 py-2 text-sm font-bold text-primary dark:bg-slate-900 dark:text-slate-200">Backend mode</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Operand A" type="number" value={valueA} onChange={(event) => setValueA(event.target.value)} />
            <Input label="Operand B" type="number" value={valueB} onChange={(event) => setValueB(event.target.value)} />
            <Select label="Measurement type" options={categoryOptions} value={category} onChange={(event) => setCategory(event.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Unit A" options={units} value={unitA} onChange={(event) => setUnitA(event.target.value)} />
              <Select label="Unit B" options={units} value={unitB} onChange={(event) => setUnitB(event.target.value)} />
            </div>
          </div>
          <div className="my-6 grid grid-cols-2 gap-3 rounded-xl bg-surface-muted p-4 dark:bg-slate-900 sm:grid-cols-4">
            {operations.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} className={`focus-ring flex min-h-24 flex-col items-center justify-center rounded-lg border text-sm font-bold transition ${operation === item.id ? "border-primary bg-primary text-white shadow-float" : "border-outline bg-white text-primary hover:border-primary-accent dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"}`} onClick={() => setOperation(item.id)}>
                  <Icon className="mb-2" size={26} />
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-container p-8 text-center text-white">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary-accent">Computed result</p>
            <p className="mt-4 text-5xl font-black">{loading ? "..." : formatNumber(result?.value, 8)}</p>
            <p className="mt-2 text-blue-100">{result?.unit || active?.label}</p>
            <Button className="mt-7 bg-white text-primary hover:bg-primary-soft" onClick={execute} disabled={loading}>Execute Operation</Button>
          </div>
        </Card>
      </div>
    </>
  );
}