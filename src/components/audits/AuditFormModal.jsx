"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@/components/Icons";
import { useClients } from "@/context/ClientsContext";

export default function AuditFormModal({ isOpen, onClose, onSubmit }) {
  const { clients } = useClients();
  const [selectedClientId, setSelectedClientId] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState("");

  const selectableClients = clients.filter(
    (client) => client.status === "Active" || client.status === "Inactive"
  );

  useEffect(() => {
    if (!isOpen) {
      setSelectedClientId("");
      setWebsiteUrl("");
      setError("");
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
    const client = selectableClients.find(
      (item) => String(item.id) === String(clientId)
    );
    setWebsiteUrl(client ? client.website : "");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedClientId) {
      setError("Please select a client.");
      return;
    }

    if (!websiteUrl.trim()) {
      setError("Website URL is required.");
      return;
    }

    if (!/^https?:\/\/.+\..+/i.test(websiteUrl.trim())) {
      setError("Enter a valid URL starting with http:// or https://.");
      return;
    }

    const client = selectableClients.find(
      (item) => String(item.id) === String(selectedClientId)
    );

    if (!client) {
      setError("Selected client could not be found.");
      return;
    }

    onSubmit({ client, websiteUrl: websiteUrl.trim() });
  };

  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent";

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
        aria-labelledby="audit-form-title"
        className="relative w-full max-w-md rounded-xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="audit-form-title" className="text-lg font-semibold text-white">
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

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5" noValidate>
          <div>
            <label
              htmlFor="audit-client"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Client
            </label>
            <select
              id="audit-client"
              value={selectedClientId}
              onChange={handleClientChange}
              className={fieldClass}
            >
              <option value="">Select a client</option>
              {selectableClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.businessName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="audit-website"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Website URL
            </label>
            <input
              id="audit-website"
              type="url"
              value={websiteUrl}
              onChange={(event) => {
                setWebsiteUrl(event.target.value);
                setError("");
              }}
              placeholder="https://example.com"
              className={fieldClass}
            />
            <p className="mt-1.5 text-xs text-muted">
              Review or adjust the website before starting the demo audit.
            </p>
          </div>

          {error ? (
            <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
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
