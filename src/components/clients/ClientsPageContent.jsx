"use client";

import { useMemo, useState } from "react";
import ClientsTable from "@/components/clients/ClientsTable";
import ClientFormModal from "@/components/clients/ClientFormModal";
import ConfirmDeleteModal from "@/components/clients/ConfirmDeleteModal";
import { PlusIcon, SearchIcon } from "@/components/Icons";
import { useClients } from "@/context/ClientsContext";

export default function ClientsPageContent() {
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editingClient, setEditingClient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === "All" || client.status === statusFilter;

      const matchesSearch =
        !query ||
        client.businessName.toLowerCase().includes(query) ||
        client.website.toLowerCase().includes(query) ||
        client.website
          .replace(/^https?:\/\//, "")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [clients, search, statusFilter]);

  const showSuccess = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(""), 3500);
  };

  const openAddModal = () => {
    setFormMode("add");
    setEditingClient(null);
    setFormOpen(true);
  };

  const openEditModal = (client) => {
    setFormMode("edit");
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (formMode === "edit" && editingClient) {
      updateClient(editingClient.id, formData);
      setFormOpen(false);
      setEditingClient(null);
      showSuccess(`${formData.businessName.trim()} was updated successfully.`);
      return;
    }

    const created = addClient(formData);
    setFormOpen(false);
    showSuccess(`${created.businessName} was added successfully.`);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    const name = deleteTarget.businessName;
    deleteClient(deleteTarget.id);
    setDeleteTarget(null);
    showSuccess(`${name} was deleted successfully.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Manage businesses and monitor their SEO performance.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Total clients:{" "}
            <span className="font-semibold text-white">{clients.length}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <PlusIcon className="h-4 w-4" />
          Add New Client
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="client-search" className="sr-only">
            Search clients
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="client-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by business name or website..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent sm:w-44"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <ClientsTable
        clients={filteredClients}
        onEdit={openEditModal}
        onDelete={setDeleteTarget}
      />

      <ClientFormModal
        isOpen={formOpen}
        mode={formMode}
        initialValues={editingClient}
        onClose={() => {
          setFormOpen(false);
          setEditingClient(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        clientName={deleteTarget?.businessName || ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
