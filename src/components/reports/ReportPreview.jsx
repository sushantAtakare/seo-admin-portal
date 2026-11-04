"use client";

import Link from "next/link";
import AuditIssues from "@/components/audits/AuditIssues";
import AuditScoreCard from "@/components/audits/AuditScoreCard";
import StatusBadge from "@/components/StatusBadge";
import {
  ArrowLeftIcon,
  DownloadIcon,
  ExternalLinkIcon,
  MailIcon,
} from "@/components/Icons";

export default function ReportPreview({
  report,
  audit,
  client,
  onDownload,
}) {
  if (!report) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-white">Report not found</p>
        <p className="mt-1 text-sm text-muted">
          This report may be unavailable or the link is invalid.
        </p>
        <Link
          href="/reports"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
        >
          <ArrowLeftIcon />
          Back to Reports
        </Link>
      </div>
    );
  }

  const isAvailable = report.status === "Available";
  const analysisReady =
    isAvailable && audit && audit.status === "Completed" && audit.seoScore != null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/reports"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
          >
            <ArrowLeftIcon />
            Back to Reports
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-white">
              {report.reportId}
            </h2>
            <StatusBadge status={report.status} />
          </div>
          <p className="mt-1 text-sm text-muted">
            Demo SEO report preview · Generated {report.generatedDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/reports"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
          >
            <ArrowLeftIcon />
            Back to Reports
          </Link>
          <button
            type="button"
            onClick={() => onDownload(report)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <DownloadIcon className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-violet-200">
        This is demo report content for UI preview only. It is not a live crawl
        or AI-generated analysis of the website.
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-white">
          Report &amp; Client Information
        </h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Report ID</dt>
            <dd className="mt-1 font-mono text-sm text-white">
              {report.reportId}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Generated date</dt>
            <dd className="mt-1 text-white">{report.generatedDate}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Linked audit</dt>
            <dd className="mt-1 font-mono text-sm text-white">
              {report.auditRef}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Business name</dt>
            <dd className="mt-1 font-medium text-white">
              {client?.businessName || report.clientName}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Industry</dt>
            <dd className="mt-1 text-white">{client?.industry || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Contact person</dt>
            <dd className="mt-1 text-white">
              {client?.contactPerson || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Contact email</dt>
            <dd className="mt-1">
              {client?.contactEmail ? (
                <a
                  href={`mailto:${client.contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
                >
                  <MailIcon />
                  {client.contactEmail}
                </a>
              ) : (
                <span className="text-muted">—</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Website URL</dt>
            <dd className="mt-1">
              <a
                href={report.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
              >
                {report.website.replace(/^https?:\/\//, "")}
                <ExternalLinkIcon />
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Audit date</dt>
            <dd className="mt-1 text-white">{report.auditDate}</dd>
          </div>
        </dl>
      </section>

      {!analysisReady ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <p className="text-base font-medium text-white">
            Full report preview unavailable
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
            {report.status === "Processing"
              ? "This report is still processing. Category scores and issues will appear when generation finishes."
              : report.status === "Pending"
                ? "This report is pending. It will be generated after the linked audit completes."
                : report.status === "Failed"
                  ? "Report generation failed for this audit. Re-run the audit to produce a new demo report."
                  : "Detailed analysis data is not available for this report yet."}
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
              AI Recommendations
            </h3>
            <p className="mt-1 text-sm text-muted">
              Demo recommendations derived from the linked audit analysis.
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
                No recommendations available for this demo report.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
