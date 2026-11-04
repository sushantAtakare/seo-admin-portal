"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@/components/Icons";
import { useAudits } from "@/context/AuditsContext";
import { useClients } from "@/context/ClientsContext";

export default function NewAuditModal({ isOpen, onClose }) {
  const { clients } = useClients();
  const { addAudit } = useAudits();
  const [selectedClientId, setSelectedClientId] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedClientId("");
      setWebsiteUrl("");
      setMessage("");
      setIsError(false);
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClientChange = (event) => {
    const clientId = event.target.value;
    setSelectedClientId(clientId);
    const client = clients.find(
      (item) => String(item.id) === String(clientId)
    );
    setWebsiteUrl(client ? client.website : "");
    setMessage("");
    setIsError(false);
  };

  const handleStartAudit = (event) => {
    event.preventDefault();

    if (!selectedClientId || !websiteUrl.trim()) {
      setIsError(true);
      setMessage("Please select a client and enter a website URL.");
      return;
    }

    const client = clients.find(
      (item) => String(item.id) === String(selectedClientId)
    );

    if (!client) {
      setIsError(true);
      setMessage("Selected client could not be found.");
      return;
    }

    const created = addAudit({ client, websiteUrl: websiteUrl.trim() });
    setIsError(false);
    setMessage(
      `Audit ${created.auditId} queued for ${created.clientName}. Tracking will appear on SEO Audits.`
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-audit-title"
        className="relative w-full max-w-md rounded-xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="new-audit-title" className="text-lg font-semibold text-white">
            Run New Audit
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleStartAudit} className="space-y-4 px-5 py-5">
          <div>
            <label
              htmlFor="dashboard-audit-client"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Client
            </label>
            <select
              id="dashboard-audit-client"
              value={selectedClientId}
              onChange={handleClientChange}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.businessName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="dashboard-audit-website"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Website URL
            </label>
            <input
              id="dashboard-audit-website"
              type="url"
              value={websiteUrl}
              onChange={(event) => {
                setWebsiteUrl(event.target.value);
                setMessage("");
                setIsError(false);
              }}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {message ? (
            <p
              className={`rounded-lg px-3 py-2 text-sm ${
                isError
                  ? "bg-rose-500/10 text-rose-300"
                  : "bg-emerald-500/10 text-emerald-300"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Start Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
