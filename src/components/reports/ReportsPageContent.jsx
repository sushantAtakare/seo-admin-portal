"use client";

import { useMemo, useState } from "react";
import ReportsTable from "@/components/reports/ReportsTable";
import StatCard from "@/components/StatCard";
import { SearchIcon } from "@/components/Icons";
import { useReports } from "@/context/ReportsContext";

const PAGE_SIZE = 5;

export default function ReportsPageContent() {
  const { reports, overviewStats } = useReports();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = reports.filter((report) => {
      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;
      const matchesSearch =
        !query ||
        report.clientName.toLowerCase().includes(query) ||
        report.website.toLowerCase().includes(query) ||
        report.website
          .replace(/^https?:\/\//, "")
          .toLowerCase()
          .includes(query) ||
        report.reportId.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });

    filtered.sort((a, b) => {
      const aTime = new Date(
        a.generatedDateISO !== "—" ? a.generatedDateISO : a.auditDateISO
      ).getTime();
      const bTime = new Date(
        b.generatedDateISO !== "—" ? b.generatedDateISO : b.auditDateISO
      ).getTime();
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });

    return filtered;
  }, [reports, search, statusFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredReports.slice(start, start + PAGE_SIZE);
  }, [filteredReports, currentPage]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 4500);
  };

  const handleDownload = (report) => {
    showNotice(
      `PDF download for ${report.reportId} is a demo action. Actual PDF generation will be connected to the backend later.`
    );
  };

  const resetPage = (updater) => {
    updater();
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">
          Access and manage SEO audit reports for all clients.
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          Total reports:{" "}
          <span className="font-semibold text-white">{overviewStats.total}</span>
        </p>
      </div>

      {notice ? (
        <div
          className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200"
          role="status"
        >
          {notice}
        </div>
      ) : null}

      <section
        aria-label="Report overview statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Total Reports"
          value={String(overviewStats.total)}
          icon="file"
          showTrend={false}
        />
        <StatCard
          label="Available Reports"
          value={String(overviewStats.available)}
          icon="check"
          showTrend={false}
        />
        <StatCard
          label="Recently Generated"
          value={String(overviewStats.recentlyGenerated)}
          icon="download"
          showTrend={false}
        />
        <StatCard
          label="Pending Reports"
          value={String(overviewStats.pending)}
          icon="clock"
          showTrend={false}
        />
      </section>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="report-search" className="sr-only">
            Search reports
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="report-search"
            type="search"
            value={search}
            onChange={(event) =>
              resetPage(() => setSearch(event.target.value))
            }
            placeholder="Search by client, website, or report ID..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
          <select
            aria-label="Filter by report status"
            value={statusFilter}
            onChange={(event) =>
              resetPage(() => setStatusFilter(event.target.value))
            }
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Processing">Processing</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            aria-label="Sort reports"
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

      <ReportsTable reports={paginatedReports} onDownload={handleDownload} />

      {filteredReports.length > 0 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredReports.length)} of{" "}
            {filteredReports.length} reports
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
    </div>
  );
}
