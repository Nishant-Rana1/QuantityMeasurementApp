import { ArrowRight, Calculator, Scale3d, SquareCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import CategoryCard from "../../components/cards/CategoryCard.jsx";
import { UNIT_CATEGORIES } from "../../utils/units.js";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Welcome To Quantity Measurement"
        description="Choose a measurement type, run precise conversions, and compare quantities across different systems of measurement."
        actions={<Button onClick={() => navigate("/converter")}>Open converter <ArrowRight size={18} /></Button>}
      />

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(UNIT_CATEGORIES).map(([key, category]) => (
          <CategoryCard key={key} category={category} onClick={() => navigate(`/converter?category=${key}`)} />
        ))}
      </section>

      <h2 className="mt-8 mb-4 text-xl font-black text-primary dark:text-white">Suite Capabilities</h2>
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-start">
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary dark:bg-slate-800 dark:text-primary-accent">
            <SquareCode size={20} />
          </span>
          <h3 className="text-lg font-black text-primary dark:text-white">Converter</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-muted dark:text-slate-300">
            Convert units dynamically across 4 dimensions: Length, Weight, Volume, and Temperature. Features multi-unit conversions with precision rounding.
          </p>
          <Button variant="ghost" onClick={() => navigate("/converter")} className="mt-4 p-0 text-primary-accent hover:bg-transparent hover:text-primary dark:text-primary-accent dark:hover:text-white">
            Launch Converter <ArrowRight size={14} className="ml-1" />
          </Button>
        </Card>

        <Card className="flex flex-col items-start">
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary dark:bg-slate-800 dark:text-primary-accent">
            <Calculator size={20} />
          </span>
          <h3 className="text-lg font-black text-primary dark:text-white">Arithmetic</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-muted dark:text-slate-300">
            Add, subtract, multiply, and divide quantities of compatible types even when they use different units. The backend handles conversions automatically.
          </p>
          <Button variant="ghost" onClick={() => navigate("/calculator")} className="mt-4 p-0 text-primary-accent hover:bg-transparent hover:text-primary dark:text-primary-accent dark:hover:text-white">
            Open Calculator <ArrowRight size={14} className="ml-1" />
          </Button>
        </Card>

        <Card className="flex flex-col items-start">
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary dark:bg-slate-800 dark:text-primary-accent">
            <Scale3d size={20} />
          </span>
          <h3 className="text-lg font-black text-primary dark:text-white">Comparison</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-muted dark:text-slate-300">
            Compare values side-by-side to verify equality or check conversion accuracy. Instantly checks compatibility rules between target unit types.
          </p>
          <Button variant="ghost" onClick={() => navigate("/comparison")} className="mt-4 p-0 text-primary-accent hover:bg-transparent hover:text-primary dark:text-primary-accent dark:hover:text-white">
            Verify Equality <ArrowRight size={14} className="ml-1" />
          </Button>
        </Card>
      </section>
    </>
  );
}
