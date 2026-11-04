"use client";

import { useParams } from "next/navigation";
import ClientDetails from "@/components/clients/ClientDetails";
import { useClients } from "@/context/ClientsContext";

export default function ClientDetailsPage() {
  const params = useParams();
  const { getClientById } = useClients();
  const client = getClientById(params.id);

  return <ClientDetails client={client} />;
}
