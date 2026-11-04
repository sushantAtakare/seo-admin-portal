"use client";

import { useParams } from "next/navigation";
import AuditDetails from "@/components/audits/AuditDetails";
import { useAudits } from "@/context/AuditsContext";

export default function AuditDetailsPage() {
  const params = useParams();
  const { getAuditById } = useAudits();
  const audit = getAuditById(params.id);

  return <AuditDetails audit={audit} />;
}
