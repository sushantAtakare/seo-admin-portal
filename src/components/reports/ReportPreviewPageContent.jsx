"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ReportPreview from "@/components/reports/ReportPreview";
import { useClients } from "@/context/ClientsContext";
import { useReports } from "@/context/ReportsContext";

export default function ReportPreviewPageContent() {
  const params = useParams();
  const { getReportBundle } = useReports();
  const { getClientById } = useClients();
  const [notice, setNotice] = useState("");

  const { report, audit } = getReportBundle(params.id);
  const client = report ? getClientById(report.clientId) : null;

  const handleDownload = (targetReport) => {
    setNotice(
      `PDF download for ${targetReport.reportId} is a demo action. Actual PDF generation will be connected to the backend later.`
    );
    window.setTimeout(() => setNotice(""), 4500);
  };

  return (
    <div className="space-y-4">
      {notice ? (
        <div
          className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200"
          role="status"
        >
          {notice}
        </div>
      ) : null}

      <ReportPreview
        report={report}
        audit={audit}
        client={client}
        onDownload={handleDownload}
      />
    </div>
  );
}
