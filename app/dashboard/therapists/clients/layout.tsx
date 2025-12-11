import { requireRole } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default async function TherapistClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Require therapist role for all client management routes
    await requireRole(["therapist"]);
  } catch (error) {
    // Redirect to login if not authenticated
    console.error("Access denied:", error);
  }

  return <>{children}</>;
}
