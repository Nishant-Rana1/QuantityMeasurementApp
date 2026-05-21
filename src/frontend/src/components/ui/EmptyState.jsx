import { Inbox } from "lucide-react";
import Card from "./Card.jsx";

export default function EmptyState({ title = "Nothing here yet", description = "Run a conversion to populate this area." }) {
  return (
    <Card className="flex min-h-44 flex-col items-center justify-center text-center">
      <Inbox className="mb-3 text-primary-accent" size={34} />
      <h3 className="text-lg font-bold text-primary dark:text-white">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-on-muted dark:text-slate-300">{description}</p>
    </Card>
  );
}
