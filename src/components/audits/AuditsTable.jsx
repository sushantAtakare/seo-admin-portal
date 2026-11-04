"use client";

import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { EyeIcon } from "@/components/Icons";

function scoreColor(score) {
  if (score == null) return "text-muted";
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-rose-400";
}

function displayWebsite(website) {
  return website.replace(/^https?:\/\//, "");
}

export default function AuditsTable({ audits }) {
  if (audits.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-white">No audits found</p>
        <p className="mt-1 text-sm text-muted">
          Try adjusting your search or filters, or run a new audit.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Client Name</th>
              <th className="px-5 py-3 font-medium">Website</th>
              <th className="px-5 py-3 font-medium">Audit ID</th>
              <th className="px-5 py-3 font-medium">Audit Date</th>
              <th className="px-5 py-3 font-medium">SEO Score</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Duration</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr
                key={audit.id}
                className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4 font-medium text-white">
                  {audit.clientName}
                </td>
                <td className="px-5 py-4">
                  <a
                    href={audit.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {displayWebsite(audit.website)}
                  </a>
                </td>
                <td className="px-5 py-4 font-mono text-xs text-zinc-300">
                  {audit.auditId}
                </td>
                <td className="px-5 py-4 text-muted">{audit.auditDate}</td>
                <td className="px-5 py-4">
                  <span
                    className={`font-semibold ${scoreColor(audit.seoScore)}`}
                  >
                    {audit.seoScore ?? "—"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={audit.status} />
                </td>
                <td className="px-5 py-4 text-muted">{audit.duration}</td>
                <td className="px-5 py-4">
                  <Link
                    href={`/audits/${audit.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
                  >
                    <EyeIcon />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
