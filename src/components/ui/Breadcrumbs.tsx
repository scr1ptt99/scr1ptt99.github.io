import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Навігація" className="mb-8 flex flex-wrap items-center gap-2 font-body text-xs text-white/40">
      <Link to="/" className="transition-colors hover:text-white">
        Головна
      </Link>
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-2">
          <ChevronRight className="h-3 w-3" />
          {it.to ? (
            <Link to={it.to} className="transition-colors hover:text-white">
              {it.label}
            </Link>
          ) : (
            <span className="text-white/70">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
