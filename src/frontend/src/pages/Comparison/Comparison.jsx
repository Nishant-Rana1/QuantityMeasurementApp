import { useMemo, useState } from "react";
import { Download, Scale3d } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select } from "../../components/ui/Input.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { compareQuantities, convertQuantity } from "../../services/quantityService.js";
import { categoryOptions, defaultUnit, UNIT_CATEGORIES } from "../../utils/units.js";
import { downloadText, formatNumber } from "../../utils/format.js";

export default function Comparison() {
  const [category, setCategory] = useState("LENGTH");
  const [valueA, setValueA] = useState("1");
  const [unitA, setUnitA] = useState(defaultUnit("LENGTH", 0));
  const [unitB, setUnitB] = useState(defaultUnit("LENGTH", 1));
  const [comparison, setComparison] = useState(null);
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const units = useMemo(() => UNIT_CATEGORIES[category].units, [category]);

  function changeCategory(next) {
    setCategory(next);
    setUnitA(defaultUnit(next, 0));
    setUnitB(defaultUnit(next, 1));
    setComparison(null);
    setMatrix([]);
  }

  async function runComparison() {
    if (valueA === "" || !Number.isFinite(Number(valueA))) {
      notify("Enter a valid base value.", "error");
      return;
    }
    setLoading(true);
    try {
      const converted = await convertQuantity({ category, fromValue: valueA, fromUnit: unitA, toUnit: unitB });
      const equal = await compareQuantities({ category, fromValue: valueA, fromUnit: unitA, toValue: converted.value, toUnit: unitB });
      const rows = await Promise.all(units.map(async (unit) => {
        const result = await convertQuantity({ category, fromValue: valueA, fromUnit: unitA, toUnit: unit.value });
        return { unit: unit.value, label: unit.label, value: result.value };
      }));
      setComparison({ converted, equal });
      setMatrix(rows);
      notify("Comparison matrix updated.", "success");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    const body = ["Unit,Value", ...matrix.map((row) => `${row.label},${row.value}`)].join("\n");
    downloadText("unit-comparison.csv", body, "text/csv");
  }

  return (
    <>
      <PageHeader title="Unit Comparison Dashboard" description="Analyze multiple units with live conversion and comparison responses." actions={<Button variant="secondary" onClick={exportCsv} disabled={!matrix.length}><Download size={18} /> Export CSV</Button>} />
      <section className="grid gap-6 xl:grid-cols-[390px_1fr]">
        <Card>
          <div className="mb-6 flex items-center gap-3">
            <Scale3d className="text-primary" />
            <h2 className="text-2xl font-black text-primary dark:text-white">Configuration</h2>
          </div>
          <div className="space-y-4">
            <Select label="Measurement type" options={categoryOptions} value={category} onChange={(event) => changeCategory(event.target.value)} />
            <Input label="Base value" type="number" value={valueA} onChange={(event) => setValueA(event.target.value)} />
            <Select label="Unit A (base)" options={units} value={unitA} onChange={(event) => setUnitA(event.target.value)} />
            <Select label="Unit B (target)" options={units} value={unitB} onChange={(event) => setUnitB(event.target.value)} />
            <Button className="w-full" onClick={runComparison} disabled={loading}>{loading ? "Running..." : "Run Comparison"}</Button>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-outline bg-surface-muted p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-primary dark:text-white">Conversion matrix</h2>
              <button aria-label="Export comparison" onClick={exportCsv} disabled={!matrix.length}><Download size={20} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.16em] text-on-muted dark:text-slate-400">
                  <tr><th className="px-5 py-4">Unit</th><th>Converted value</th><th>Selected</th></tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.unit} className={`border-t border-outline dark:border-slate-800 ${row.unit === unitB ? "bg-primary-soft/70 dark:bg-primary/30" : ""}`}>
                      <td className="px-5 py-4 font-bold text-primary dark:text-white">{row.label}</td>
                      <td>{formatNumber(row.value, 8)}</td>
                      <td>{row.unit === unitB ? "Target" : row.unit === unitA ? "Base" : "Comparable"}</td>
                    </tr>
                  ))}
                  {!matrix.length && <tr><td className="px-5 py-8 text-on-muted" colSpan="3">Run a comparison to populate the matrix.</td></tr>}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
