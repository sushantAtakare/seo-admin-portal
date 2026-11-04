"use client";

import Link from "next/link";
import AuditIssues from "@/components/audits/AuditIssues";
import AuditScoreCard from "@/components/audits/AuditScoreCard";
import StatusBadge from "@/components/StatusBadge";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/Icons";

export default function AuditDetails({ audit }) {
  if (!audit) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-white">Audit not found</p>
        <p className="mt-1 text-sm text-muted">
          This audit may have been removed or the link is invalid.
        </p>
        <Link
          href="/audits"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
        >
          <ArrowLeftIcon />
          Back to SEO Audits
        </Link>
      </div>
    );
  }

  const isPending = audit.status === "Pending";

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/audits"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeftIcon />
          Back to SEO Audits
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-white">{audit.auditId}</h2>
          <StatusBadge status={audit.status} />
        </div>
        <p className="mt-1 text-sm text-muted">
          Demo audit report for {audit.clientName}
        </p>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-white">Audit Information</h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Audit ID</dt>
            <dd className="mt-1 font-mono text-sm text-white">{audit.auditId}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Client name</dt>
            <dd className="mt-1 font-medium text-white">{audit.clientName}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Website</dt>
            <dd className="mt-1">
              <a
                href={audit.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
              >
                {audit.website.replace(/^https?:\/\//, "")}
                <ExternalLinkIcon />
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Audit date</dt>
            <dd className="mt-1 text-white">{audit.auditDate}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Audit status</dt>
            <dd className="mt-2">
              <StatusBadge status={audit.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Audit duration</dt>
            <dd className="mt-1 text-white">{audit.duration}</dd>
          </div>
        </dl>
      </section>

      {isPending ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <p className="text-base font-medium text-white">
            Audit queued (demo)
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
            This audit is pending. Score breakdowns, issues, and recommendations
            will appear here once processing completes in a future integration.
          </p>
        </div>
      ) : (
        <>
          <AuditScoreCard
            score={audit.seoScore}
            categories={audit.categories}
          />

          <AuditIssues issues={audit.issues} />

          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-white">
              Recommendations
            </h3>
            <p className="mt-1 text-sm text-muted">
              Suggested next steps from this demo analysis.
            </p>
            {audit.recommendations?.length ? (
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-300">
                {audit.recommendations.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-sm text-muted">
                No recommendations available for this audit.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
