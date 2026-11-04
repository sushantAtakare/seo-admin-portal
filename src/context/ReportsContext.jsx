"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  buildReportsFromAudits,
  getReportOverviewStats,
} from "@/data/dummyData";
import { useAudits } from "@/context/AuditsContext";

const ReportsContext = createContext(null);

export function ReportsProvider({ children }) {
  const { audits, getAuditById } = useAudits();

  const reports = useMemo(
    () => buildReportsFromAudits(audits),
    [audits]
  );

  const overviewStats = useMemo(
    () => getReportOverviewStats(reports),
    [reports]
  );

  const getReportById = useCallback(
    (id) => reports.find((report) => String(report.id) === String(id)),
    [reports]
  );

  const getReportBundle = useCallback(
    (id) => {
      const report = getReportById(id);
      if (!report) {
        return { report: null, audit: null };
      }

      return {
        report,
        audit: getAuditById(report.auditId) || null,
      };
    },
    [getReportById, getAuditById]
  );

  const value = useMemo(
    () => ({
      reports,
      overviewStats,
      getReportById,
      getReportBundle,
    }),
    [reports, overviewStats, getReportById, getReportBundle]
  );

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
}
