/**
 * Sidebar System Components
 *
 * This module provides a flexible sidebar system built on shadcn/ui components.
 *
 * ## Usage
 *
 * ### Option 1: Static Configuration (Recommended)
 * ```tsx
 * // In your page or layout
 * import { AppSidebar } from "@/components/sidebar";
 * import { Home, Settings } from "lucide-react";
 *
 * export const sidebarConfig = {
 *   title: "My App",
 *   items: [
 *     { label: "Home", href: "/", icon: Home },
 *     { label: "Settings", href: "/settings", icon: Settings },
 *   ],
 * };
 *
 * <AppSidebar config={sidebarConfig} />
 * ```
 *
 * ### Option 2: Dynamic Configuration
 * ```tsx
 * // In your page component
 * "use client";
 * import { useSidebarConfig } from "@/components/sidebar";
 * import { useEffect } from "react";
 *
 * export default function MyPage() {
 *   const { setSidebarConfig } = useSidebarConfig();
 *
 *   useEffect(() => {
 *     setSidebarConfig({
 *       title: "Dynamic Sidebar",
 *       items: [
 *         { label: "Item 1", href: "/item1" }
 *       ]
 *     });
 *   }, []);
 *
 *   return <div>My Page</div>;
 * }
 * ```
 *
 * ### Option 3: Grouped Items
 * ```tsx
 * export const sidebarConfig = {
 *   title: "Dashboard",
 *   groups: [
 *     {
 *       title: "Main",
 *       items: [
 *         { label: "Overview", href: "/dashboard", icon: Home }
 *       ]
 *     },
 *     {
 *       title: "Settings",
 *       items: [
 *         { label: "Profile", href: "/settings/profile", icon: User }
 *       ]
 *     }
 *   ]
 * };
 * ```
 */

export { AppSidebar } from "./app-sidebar";
export {
  SidebarConfigProvider,
  useSidebarConfig,
} from "./sidebar-config-provider";
export type { SidebarConfig, SidebarItem, SidebarGroup } from "./types";
