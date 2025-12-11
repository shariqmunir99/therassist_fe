"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientForm } from "./ClientForm";
import { useUpdateClient } from "../hooks/useClients";
import { Client, ClientFormData } from "../models/Client";
import { toast } from "sonner";

interface EditClientModalProps {
  client: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditClientModal({
  client,
  open,
  onOpenChange,
}: EditClientModalProps) {
  const updateClient = useUpdateClient();

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await updateClient.mutateAsync({
        id: client.id,
        ...data,
      });
      toast.success("Client updated successfully");
      onOpenChange(false);
    } catch (error: any) {
      // Check if it's an alias uniqueness error
      if (
        error.response?.status === 409 ||
        error.response?.data?.message?.includes("alias")
      ) {
        toast.error(
          "This alias is already taken. Please choose a different one."
        );
      } else {
        toast.error(error.response?.data?.message || "Failed to update client");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update client information. The alias must be unique.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          defaultValues={{
            alias: client.alias,
            ageGroup: client.ageGroup,
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateClient.isPending}
          submitLabel="Update Client"
        />
      </DialogContent>
    </Dialog>
  );
}
