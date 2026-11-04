"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createClientRecord,
  initialClients,
} from "@/data/dummyData";

const ClientsContext = createContext(null);

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState(initialClients);

  const nextId = useMemo(
    () => clients.reduce((max, client) => Math.max(max, client.id), 0) + 1,
    [clients]
  );

  const getClientById = useCallback(
    (id) => clients.find((client) => String(client.id) === String(id)),
    [clients]
  );

  const addClient = useCallback(
    (formData) => {
      const newClient = createClientRecord(formData, nextId);
      setClients((prev) => [newClient, ...prev]);
      return newClient;
    },
    [nextId]
  );

  const updateClient = useCallback((id, formData) => {
    setClients((prev) =>
      prev.map((client) =>
        String(client.id) === String(id)
          ? {
              ...client,
              businessName: formData.businessName.trim(),
              website: formData.website.trim(),
              contactPerson: formData.contactPerson.trim(),
              contactEmail: formData.contactEmail.trim(),
              industry: formData.industry,
              status: formData.status,
            }
          : client
      )
    );
  }, []);

  const deleteClient = useCallback((id) => {
    setClients((prev) =>
      prev.filter((client) => String(client.id) !== String(id))
    );
  }, []);

  const value = useMemo(
    () => ({
      clients,
      getClientById,
      addClient,
      updateClient,
      deleteClient,
    }),
    [clients, getClientById, addClient, updateClient, deleteClient]
  );

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
}
