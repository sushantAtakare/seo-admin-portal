"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createPendingAudit,
  getAuditOverviewStats,
  initialAudits,
} from "@/data/dummyData";

const AuditsContext = createContext(null);

export function AuditsProvider({ children }) {
  const [audits, setAudits] = useState(initialAudits);

  const nextId = useMemo(
    () => audits.reduce((max, audit) => Math.max(max, audit.id), 0) + 1,
    [audits]
  );

  const nextSequence = useMemo(() => {
    const numbers = audits.map((audit) => {
      const match = String(audit.auditId).match(/(\d+)$/);
      return match ? Number(match[1]) : 0;
    });
    return Math.max(0, ...numbers) + 1;
  }, [audits]);

  const overviewStats = useMemo(
    () => getAuditOverviewStats(audits),
    [audits]
  );

  const getAuditById = useCallback(
    (id) => audits.find((audit) => String(audit.id) === String(id)),
    [audits]
  );

  const addAudit = useCallback(
    ({ client, websiteUrl }) => {
      const audit = createPendingAudit({
        client,
        websiteUrl,
        nextId,
        sequence: nextSequence,
      });
      setAudits((prev) => [audit, ...prev]);
      return audit;
    },
    [nextId, nextSequence]
  );

  const value = useMemo(
    () => ({
      audits,
      overviewStats,
      getAuditById,
      addAudit,
    }),
    [audits, overviewStats, getAuditById, addAudit]
  );

  return (
    <AuditsContext.Provider value={value}>{children}</AuditsContext.Provider>
  );
}

export function useAudits() {
  const context = useContext(AuditsContext);
  if (!context) {
    throw new Error("useAudits must be used within an AuditsProvider");
  }
  return context;
}
