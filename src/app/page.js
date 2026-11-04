"use client";

import { useState } from "react";
import ClientOverview from "@/components/ClientOverview";
import NewAuditModal from "@/components/NewAuditModal";
import RecentAudits from "@/components/RecentAudits";
import StatCard from "@/components/StatCard";
import { PlusIcon } from "@/components/Icons";
import {
  recentAudits,
  recentClients,
  stats,
} from "@/data/dummyData";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Monitor clients, audits, and SEO performance at a glance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <PlusIcon className="h-4 w-4" />
          Run New Audit
        </button>
      </div>

      <section
        aria-label="Dashboard statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentAudits audits={recentAudits} />
        </div>
        <div>
          <ClientOverview clients={recentClients} />
        </div>
      </div>

      <NewAuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
