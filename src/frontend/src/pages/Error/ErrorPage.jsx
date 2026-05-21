import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";

export default function ErrorPage() {
  return (
    <Card className="mx-auto flex max-w-2xl flex-col items-center py-14 text-center">
      <AlertTriangle className="mb-4 text-danger" size={48} />
      <h1 className="text-3xl font-black text-primary dark:text-white">Application error</h1>
      <p className="mt-3 max-w-md text-on-muted dark:text-slate-300">The request could not be completed. Check that the backend is running on port 8081.</p>
      <Button className="mt-6" as={Link} to="/dashboard">Return to dashboard</Button>
    </Card>
  );
}
