"use client";

import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { EyeIcon, PencilIcon, TrashIcon } from "@/components/Icons";

function scoreColor(score) {
  if (score == null) return "text-muted";
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-rose-400";
}

function displayWebsite(website) {
  return website.replace(/^https?:\/\//, "");
}

export default function ClientsTable({
  clients,
  onEdit,
  onDelete,
}) {
  if (clients.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-white">No clients found</p>
        <p className="mt-1 text-sm text-muted">
          Try adjusting your search or status filter, or add a new client.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Business Name</th>
              <th className="px-5 py-3 font-medium">Website</th>
              <th className="px-5 py-3 font-medium">Contact Email</th>
              <th className="px-5 py-3 font-medium">Last SEO Score</th>
              <th className="px-5 py-3 font-medium">Last Audit Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{client.businessName}</p>
                  <p className="mt-0.5 text-xs text-muted">{client.industry}</p>
                </td>
                <td className="px-5 py-4">
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {displayWebsite(client.website)}
                  </a>
                </td>
                <td className="px-5 py-4 text-muted">{client.contactEmail}</td>
                <td className="px-5 py-4">
                  <span
                    className={`font-semibold ${scoreColor(
                      client.lastAuditScore
                    )}`}
                  >
                    {client.lastAuditScore ?? "—"}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted">{client.lastAuditDate}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={client.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/clients/${client.id}`}
                      className="rounded-lg border border-border p-1.5 text-muted transition-colors hover:border-zinc-600 hover:text-white"
                      aria-label={`View ${client.businessName}`}
                      title="View Details"
                    >
                      <EyeIcon />
                    </Link>
                    <button
                      type="button"
                      onClick={() => onEdit(client)}
                      className="rounded-lg border border-border p-1.5 text-muted transition-colors hover:border-zinc-600 hover:text-white"
                      aria-label={`Edit ${client.businessName}`}
                      title="Edit Client"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(client)}
                      className="rounded-lg border border-border p-1.5 text-muted transition-colors hover:border-rose-500/40 hover:text-rose-400"
                      aria-label={`Delete ${client.businessName}`}
                      title="Delete Client"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
