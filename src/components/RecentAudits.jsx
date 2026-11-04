import StatusBadge from "@/components/StatusBadge";
import { ExternalLinkIcon } from "@/components/Icons";

function scoreColor(score) {
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-rose-400";
}

export default function RecentAudits({ audits }) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Recent SEO Audits
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            Latest audit activity across your clients
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Client / Website</th>
              <th className="px-5 py-3 font-medium">Audit Date</th>
              <th className="px-5 py-3 font-medium">SEO Score</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr
                key={audit.id}
                className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{audit.client}</p>
                  <p className="mt-0.5 text-xs text-muted">{audit.website}</p>
                </td>
                <td className="px-5 py-4 text-muted">{audit.auditDate}</td>
                <td className="px-5 py-4">
                  <span
                    className={`font-semibold ${scoreColor(audit.seoScore)}`}
                  >
                    {audit.seoScore}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={audit.status} />
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    View
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
