"use client";

import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  MailIcon,
} from "@/components/Icons";

function scoreColor(score) {
  if (score == null || score === 0) return "text-muted";
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-rose-400";
}

function MetricBar({ label, value }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className={`font-medium ${scoreColor(value)}`}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function ClientDetails({ client }) {
  if (!client) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-white">Client not found</p>
        <p className="mt-1 text-sm text-muted">
          This client may have been deleted or the link is invalid.
        </p>
        <Link
          href="/clients"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
        >
          <ArrowLeftIcon />
          Back to Clients
        </Link>
      </div>
    );
  }

  const summary = client.performanceSummary || {};
  const history = client.auditHistory || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/clients"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
          >
            <ArrowLeftIcon />
            Back to Clients
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-white">
              {client.businessName}
            </h2>
            <StatusBadge status={client.status} />
          </div>
          <p className="mt-1 text-sm text-muted">{client.industry}</p>
        </div>

        <div className="rounded-xl border border-border bg-card px-5 py-4 text-center sm:min-w-[140px]">
          <p className="text-xs uppercase tracking-wide text-muted">
            Current SEO Score
          </p>
          <p
            className={`mt-1 text-3xl font-semibold ${scoreColor(
              client.lastAuditScore
            )}`}
          >
            {client.lastAuditScore ?? "—"}
          </p>
          <p className="mt-1 text-xs text-muted">
            Last audit: {client.lastAuditDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-1">
          <h3 className="text-base font-semibold text-white">
            Business Information
          </h3>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-muted">Contact Person</dt>
              <dd className="mt-1 font-medium text-white">
                {client.contactPerson}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Contact Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${client.contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
                >
                  <MailIcon />
                  {client.contactEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Website</dt>
              <dd className="mt-1">
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
                >
                  {client.website.replace(/^https?:\/\//, "")}
                  <ExternalLinkIcon />
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Industry</dt>
              <dd className="mt-1 font-medium text-white">{client.industry}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd className="mt-2">
                <StatusBadge status={client.status} />
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h3 className="text-base font-semibold text-white">
            SEO Performance Summary
          </h3>
          <p className="mt-1 text-sm text-muted">
            Category scores from the most recent completed audit.
          </p>

          {client.lastAuditScore == null ? (
            <div className="mt-8 rounded-lg border border-dashed border-border px-4 py-10 text-center">
              <p className="text-sm text-muted">
                No SEO performance data yet. Run an audit to populate scores.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <MetricBar label="Technical SEO" value={summary.technicalSeo || 0} />
              <MetricBar
                label="Content Quality"
                value={summary.contentQuality || 0}
              />
              <MetricBar label="Backlinks" value={summary.backlinks || 0} />
              <MetricBar
                label="Mobile Usability"
                value={summary.mobileUsability || 0}
              />
              <MetricBar label="Page Speed" value={summary.pageSpeed || 0} />
            </div>
          )}
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-base font-semibold text-white">
            Recent Audit History
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            Past SEO audits for this client
          </p>
        </div>

        {history.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-muted">
              No audits recorded yet for this client.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {history.map((audit) => (
                  <tr
                    key={audit.id}
                    className="border-b border-border/70 last:border-0"
                  >
                    <td className="px-5 py-4 text-muted">{audit.date}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-semibold ${scoreColor(audit.score)}`}
                      >
                        {audit.score}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={audit.status} />
                    </td>
                    <td className="px-5 py-4 text-muted">{audit.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
