/**
 * Represents a single item in the sidebar navigation
 */
export interface SidebarItem {
  /** Display label for the sidebar item */
  label: string;
  /** URL path for navigation */
  href: string;
  /** Lucide icon name (e.g., 'Home', 'Users', 'Settings') */
  icon?: string;
  /** Badge content (e.g., notification count) */
  badge?: string | number;
}

/**
 * Represents a group of related sidebar items
 */
export interface SidebarGroup {
  /** Group title */
  title?: string;
  /** Items within this group */
  items: SidebarItem[];
}

/**
 * Complete sidebar configuration for a page
 */
export interface SidebarConfig {
  /** Main title displayed at the top of the sidebar */
  title?: string;
  /** Simple list of items (converted to a single group internally) */
  items?: SidebarItem[];
  /** Multiple grouped sections */
  groups?: SidebarGroup[];
}
