"use client";

import { useEffect } from "react";
import { XIcon } from "@/components/Icons";

export default function ConfirmDeleteModal({
  isOpen,
  clientName,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!isOpen) return;

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
        aria-labelledby="delete-client-title"
        className="relative w-full max-w-md rounded-xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2
            id="delete-client-title"
            className="text-lg font-semibold text-white"
          >
            Delete Client
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

        <div className="space-y-5 px-5 py-5">
          <p className="text-sm text-muted">
            Are you sure you want to delete{" "}
            <span className="font-medium text-white">{clientName}</span>? This
            action cannot be undone in this session.
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
