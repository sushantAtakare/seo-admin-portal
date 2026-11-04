function scoreColor(score) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-rose-400";
}

export default function ClientOverview({ clients }) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold text-white">Client Overview</h2>
        <p className="mt-0.5 text-sm text-muted">
          Recent clients and their latest audit scores
        </p>
      </div>

      <ul className="divide-y divide-border">
        {clients.map((client) => (
          <li
            key={client.id}
            className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-sm font-semibold text-accent">
              {client.businessName
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">
                {client.businessName}
              </p>
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 block truncate text-xs text-muted transition-colors hover:text-accent"
              >
                {client.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-semibold ${scoreColor(
                  client.lastAuditScore
                )}`}
              >
                {client.lastAuditScore}
              </p>
              <p className="mt-0.5 text-xs text-muted">{client.lastAuditDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
