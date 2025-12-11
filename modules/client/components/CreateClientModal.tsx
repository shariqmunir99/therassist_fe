"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientForm } from "./ClientForm";
import { useCreateClient } from "../hooks/useClients";
import { ClientFormData } from "../models/Client";
import { toast } from "sonner";

interface CreateClientModalProps {
  therapistId: string;
  trigger?: React.ReactNode;
}

export function CreateClientModal({
  therapistId,
  trigger,
}: CreateClientModalProps) {
  const [open, setOpen] = useState(false);
  const createClient = useCreateClient();

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await createClient.mutateAsync({
        ...data,
        therapistId,
      });
      toast.success("Client created successfully");
      setOpen(false);
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
        toast.error(error.response?.data?.message || "Failed to create client");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Client</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Client Profile
          </DialogTitle>
          <DialogDescription className="text-sm">
            Add a new pseudonymous profile. All fields are optional except for
            the Email, Alias/Code and Age Group.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={createClient.isPending}
          submitLabel="Create Client"
        />
      </DialogContent>
    </Dialog>
  );
}
