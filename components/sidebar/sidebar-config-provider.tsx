"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { SidebarConfig } from "./types";

interface SidebarConfigContextType {
  config: SidebarConfig | null;
  setSidebarConfig: (config: SidebarConfig | null) => void;
}

const SidebarConfigContext = createContext<
  SidebarConfigContextType | undefined
>(undefined);

/**
 * Provider that manages sidebar configuration state across the application.
 * Wrap your app/layout with this provider to enable dynamic sidebar configuration.
 */
export function SidebarConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SidebarConfig | null>(null);

  const setSidebarConfig = (newConfig: SidebarConfig | null) => {
    setConfig(newConfig);
  };

  return (
    <SidebarConfigContext.Provider value={{ config, setSidebarConfig }}>
      {children}
    </SidebarConfigContext.Provider>
  );
}

/**
 * Hook to access and update sidebar configuration.
 * Use this in pages to dynamically set sidebar content.
 *
 * @example
 * ```tsx
 * const { setSidebarConfig } = useSidebarConfig();
 *
 * useEffect(() => {
 *   setSidebarConfig({
 *     title: "Dashboard",
 *     items: [
 *       { label: "Overview", href: "/dashboard", icon: Home }
 *     ]
 *   });
 * }, []);
 * ```
 */
export function useSidebarConfig() {
  const context = useContext(SidebarConfigContext);
  if (!context) {
    throw new Error(
      "useSidebarConfig must be used within a SidebarConfigProvider"
    );
  }
  return context;
}
