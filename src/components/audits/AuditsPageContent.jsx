"use client";

import { useMemo, useState } from "react";
import AuditFormModal from "@/components/audits/AuditFormModal";
import AuditsTable from "@/components/audits/AuditsTable";
import StatCard from "@/components/StatCard";
import { PlusIcon, SearchIcon } from "@/components/Icons";
import { useAudits } from "@/context/AuditsContext";

const PAGE_SIZE = 5;

function matchesDateFilter(audit, dateFilter) {
  if (dateFilter === "All") return true;

  const auditTime = new Date(audit.auditDateISO).getTime();
  if (Number.isNaN(auditTime)) return false;

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  if (dateFilter === "7d") return now - auditTime <= 7 * dayMs;
  if (dateFilter === "30d") return now - auditTime <= 30 * dayMs;
  if (dateFilter === "older") return now - auditTime > 30 * dayMs;

  return true;
}

export default function AuditsPageContent() {
  const { audits, overviewStats, addAudit } = useAudits();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredAudits = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = audits.filter((audit) => {
      const matchesStatus =
        statusFilter === "All" || audit.status === statusFilter;
      const matchesDate = matchesDateFilter(audit, dateFilter);
      const matchesSearch =
        !query ||
        audit.clientName.toLowerCase().includes(query) ||
        audit.website.toLowerCase().includes(query) ||
        audit.website.replace(/^https?:\/\//, "").toLowerCase().includes(query) ||
        audit.auditId.toLowerCase().includes(query);

      return matchesStatus && matchesDate && matchesSearch;
    });

    filtered.sort((a, b) => {
      const aTime = new Date(a.auditDateISO).getTime();
      const bTime = new Date(b.auditDateISO).getTime();
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });

    return filtered;
  }, [audits, search, statusFilter, dateFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredAudits.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedAudits = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAudits.slice(start, start + PAGE_SIZE);
  }, [filteredAudits, currentPage]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(""), 3500);
  };

  const handleStartAudit = ({ client, websiteUrl }) => {
    const created = addAudit({ client, websiteUrl });
    setModalOpen(false);
    setPage(1);
    setSearch("");
    setStatusFilter("All");
    setDateFilter("All");
    setSortOrder("newest");
    showSuccess(
      `Audit ${created.auditId} queued for ${created.clientName} (Pending).`
    );
  };

  const resetPage = (updater) => {
    updater();
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Monitor and manage SEO audits across all business clients.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <PlusIcon className="h-4 w-4" />
          Run New Audit
        </button>
      </div>

      {successMessage ? (
        <div
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
          role="status"
        >
          {successMessage}
        </div>
      ) : null}

      <section
        aria-label="Audit overview statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Total Audits"
          value={String(overviewStats.total)}
          icon="search"
          showTrend={false}
        />
        <StatCard
          label="Completed"
          value={String(overviewStats.completed)}
          icon="check"
          showTrend={false}
        />
        <StatCard
          label="In Progress"
          value={String(overviewStats.inProgress)}
          icon="clock"
          showTrend={false}
        />
        <StatCard
          label="Failed"
          value={String(overviewStats.failed)}
          icon="alert"
          showTrend={false}
        />
      </section>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="audit-search" className="sr-only">
            Search audits
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="audit-search"
            type="search"
            value={search}
            onChange={(event) =>
              resetPage(() => setSearch(event.target.value))
            }
            placeholder="Search by client, website, or audit ID..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) =>
              resetPage(() => setStatusFilter(event.target.value))
            }
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            aria-label="Filter by date"
            value={dateFilter}
            onChange={(event) =>
              resetPage(() => setDateFilter(event.target.value))
            }
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="All">All Dates</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="older">Older than 30 days</option>
          </select>

          <select
            aria-label="Sort audits"
            value={sortOrder}
            onChange={(event) =>
              resetPage(() => setSortOrder(event.target.value))
            }
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <AuditsTable audits={paginatedAudits} />

      {filteredAudits.length > 0 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredAudits.length)} of{" "}
            {filteredAudits.length} audits
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage >= totalPages}
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      <AuditFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleStartAudit}
      />
    </div>
  );
}
