"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { useSidebarConfig } from "./sidebar-config-provider";
import { SidebarConfig, SidebarGroup as SidebarGroupType } from "./types";

/**
 * Map icon name string to actual Lucide icon component
 */
function getIcon(iconName?: string): LucideIcon | undefined {
  if (!iconName) return undefined;
  // @ts-ignore - dynamic icon lookup
  return Icons[iconName] as LucideIcon;
}

/**
 * Default sidebar configuration used when no page-specific config is provided
 */
const DEFAULT_SIDEBAR_CONFIG: SidebarConfig = {
  title: "Dashboard",
  items: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "Home",
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  /** Optional static configuration (overrides context) */
  config?: SidebarConfig;
}

/**
 * Main application sidebar component.
 *
 * This component renders the sidebar using shadcn/ui primitives.
 * It can receive configuration either:
 * 1. Via the `config` prop (static)
 * 2. Via the SidebarConfigProvider context (dynamic)
 * 3. Falls back to DEFAULT_SIDEBAR_CONFIG
 *
 * @example
 * ```tsx
 * // In dashboard layout
 * <AppSidebar config={sidebarConfig} />
 *
 * // Or use context-based approach
 * <AppSidebar />
 * ```
 */
export function AppSidebar({
  config: staticConfig,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname();
  const { config: contextConfig } = useSidebarConfig();

  // Priority: static config > context config > default config
  const config = staticConfig || contextConfig || DEFAULT_SIDEBAR_CONFIG;

  // Normalize config: convert simple items array to groups format
  const groups: SidebarGroupType[] = React.useMemo(() => {
    if (config.groups) {
      return config.groups;
    }
    if (config.items) {
      return [{ items: config.items }];
    }
    return [];
  }, [config]);

  return (
    <Sidebar {...props}>
      {config.title && (
        <SidebarHeader className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">{config.title}</h2>
        </SidebarHeader>
      )}
      <SidebarContent>
        {groups.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  const Icon = getIcon(item.icon);

                  return (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          {Icon && <Icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                          {item.badge && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
