"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AuditsProvider } from "@/context/AuditsContext";
import { ClientsProvider } from "@/context/ClientsContext";
import { ReportsProvider } from "@/context/ReportsContext";

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ClientsProvider>
      <AuditsProvider>
        <ReportsProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className="lg:pl-64">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
            </div>
          </div>
        </ReportsProvider>
      </AuditsProvider>
    </ClientsProvider>
  );
}
