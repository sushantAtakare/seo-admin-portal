"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@/components/Icons";
import { createEmptyClient, industries } from "@/data/dummyData";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_REGEX = /^https?:\/\/.+\..+/i;

function validate(form) {
  const errors = {};

  if (!form.businessName.trim()) {
    errors.businessName = "Business name is required.";
  }

  if (!form.website.trim()) {
    errors.website = "Website URL is required.";
  } else if (!WEBSITE_REGEX.test(form.website.trim())) {
    errors.website = "Enter a valid URL starting with http:// or https://.";
  }

  if (!form.contactPerson.trim()) {
    errors.contactPerson = "Contact person is required.";
  }

  if (!form.contactEmail.trim()) {
    errors.contactEmail = "Contact email is required.";
  } else if (!EMAIL_REGEX.test(form.contactEmail.trim())) {
    errors.contactEmail = "Enter a valid email address.";
  }

  if (!form.industry) {
    errors.industry = "Industry is required.";
  }

  if (!form.status) {
    errors.status = "Status is required.";
  }

  return errors;
}

export default function ClientFormModal({
  isOpen,
  mode = "add",
  initialValues = null,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(createEmptyClient());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    setForm(
      initialValues
        ? {
            businessName: initialValues.businessName || "",
            website: initialValues.website || "",
            contactPerson: initialValues.contactPerson || "",
            contactEmail: initialValues.contactEmail || "",
            industry: initialValues.industry || "",
            status: initialValues.status || "Active",
          }
        : createEmptyClient()
    );
    setErrors({});

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, initialValues, onClose]);

  if (!isOpen) return null;

  const title = mode === "edit" ? "Edit Client" : "Add New Client";
  const submitLabel = mode === "edit" ? "Save Changes" : "Add Client";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit(form);
  };

  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent";

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
        aria-labelledby="client-form-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-card shadow-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <h2
            id="client-form-title"
            className="text-lg font-semibold text-white"
          >
            {title}
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
              htmlFor="businessName"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Acme Inc."
              className={fieldClass}
            />
            {errors.businessName ? (
              <p className="mt-1 text-xs text-rose-400">{errors.businessName}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="website"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Website URL
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className={fieldClass}
            />
            {errors.website ? (
              <p className="mt-1 text-xs text-rose-400">{errors.website}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="contactPerson"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Contact Person
            </label>
            <input
              id="contactPerson"
              name="contactPerson"
              type="text"
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={fieldClass}
            />
            {errors.contactPerson ? (
              <p className="mt-1 text-xs text-rose-400">
                {errors.contactPerson}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="contactEmail"
              className="mb-1.5 block text-sm font-medium text-zinc-300"
            >
              Contact Email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="jane@example.com"
              className={fieldClass}
            />
            {errors.contactEmail ? (
              <p className="mt-1 text-xs text-rose-400">{errors.contactEmail}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="industry"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {errors.industry ? (
                <p className="mt-1 text-xs text-rose-400">{errors.industry}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status ? (
                <p className="mt-1 text-xs text-rose-400">{errors.status}</p>
              ) : null}
            </div>
          </div>

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
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
