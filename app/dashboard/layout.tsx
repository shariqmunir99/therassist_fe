import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { SidebarConfig } from "@/components/sidebar";
import { DashboardHeader } from "./dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If no user, the middleware will handle the redirect
  // We return null here to prevent double redirects
  if (!user) {
    return null;
  }

  // Build sidebar configuration based on user role
  const sidebarConfig: SidebarConfig = {
    title: "Therassist",
    groups: [
      {
        title: "Main",
        items: [
          {
            label: "Dashboard",
            href:
              user.role === "therapist"
                ? "/dashboard/therapists"
                : user.role === "client"
                ? "/dashboard/clients"
                : "/dashboard",
            icon: "Home",
          },
        ],
      },
      ...(user.role === "therapist"
        ? [
            {
              title: "Therapist",
              items: [
                {
                  label: "Clients",
                  href: "/dashboard/therapists/clients",
                  icon: "Users",
                },
                {
                  label: "Sessions",
                  href: "/dashboard/therapists/sessions",
                  icon: "Video",
                },
                {
                  label: "Availability",
                  href: "/dashboard/therapists/availability",
                  icon: "Calendar",
                },
                {
                  label: "Settings",
                  href: "/dashboard/therapists/settings",
                  icon: "Settings",
                },
              ],
            },
          ]
        : []),
      ...(user.role === "client"
        ? [
            {
              title: "Client",
              items: [
                {
                  label: "My Sessions",
                  href: "/dashboard/clients",
                  icon: "Video",
                },
              ],
            },
          ]
        : []),
    ],
  };

  return (
    <SidebarProvider>
      <AppSidebar config={sidebarConfig} />
      <SidebarInset>
        <DashboardHeader userName={user.name || user.email} />
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
