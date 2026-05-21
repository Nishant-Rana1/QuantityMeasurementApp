import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";

export default function NotFound() {
  return (
    <Card className="mx-auto flex max-w-2xl flex-col items-center py-14 text-center">
      <Compass className="mb-4 text-primary-accent" size={48} />
      <h1 className="text-3xl font-black text-primary dark:text-white">404</h1>
      <p className="mt-3 max-w-md text-on-muted dark:text-slate-300">That route does not exist in MeasurePro.</p>
      <Link to="/dashboard"><Button className="mt-6">Return to dashboard</Button></Link>
    </Card>
  );
}
