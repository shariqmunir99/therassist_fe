# Sidebar System Documentation

## Overview

This project uses a flexible, reusable sidebar system built on shadcn/ui components. The sidebar adapts to the user's role and can be configured either statically or dynamically.

## Architecture

### Components

1. **`AppSidebar`** (`components/sidebar/app-sidebar.tsx`)

   - Main sidebar component built with shadcn/ui primitives
   - Renders navigation items, groups, and handles active states
   - Automatically highlights current route

2. **`SidebarConfigProvider`** (`components/sidebar/sidebar-config-provider.tsx`)

   - React Context provider for dynamic sidebar configuration
   - Allows pages to set sidebar content programmatically

3. **Type Definitions** (`components/sidebar/types.ts`)
   - `SidebarConfig`: Complete sidebar configuration
   - `SidebarItem`: Individual navigation item
   - `SidebarGroup`: Grouped navigation items

### Key Features

- ✅ Built entirely with shadcn/ui components
- ✅ Responsive (desktop sidebar + mobile sheet)
- ✅ Active route highlighting
- ✅ Support for icons (Lucide React)
- ✅ Support for badges (notifications, counts)
- ✅ Collapsible sidebar
- ✅ Keyboard shortcut (Cmd/Ctrl + B)
- ✅ Role-based configuration
- ✅ Static or dynamic configuration

## Usage

### Option 1: Static Configuration (Recommended)

Best for layouts where sidebar content is known at render time.

```tsx
// app/dashboard/layout.tsx
import { AppSidebar } from "@/components/sidebar";
import { Home, Settings } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const sidebarConfig = {
  title: "My App",
  items: [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
};

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar config={sidebarConfig} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
```

### Option 2: Dynamic Configuration

Best for pages that need to change sidebar content based on state or data.

```tsx
"use client";

import { useSidebarConfig } from "@/components/sidebar";
import { useEffect } from "react";
import { Home, FileText } from "lucide-react";

export default function MyPage() {
  const { setSidebarConfig } = useSidebarConfig();

  useEffect(() => {
    setSidebarConfig({
      title: "Dynamic Page",
      items: [
        { label: "Overview", href: "/overview", icon: Home },
        { label: "Documents", href: "/docs", icon: FileText, badge: "3" },
      ],
    });

    // Cleanup: reset to null when component unmounts
    return () => setSidebarConfig(null);
  }, [setSidebarConfig]);

  return <div>Page Content</div>;
}
```

### Option 3: Grouped Items

Organize navigation into logical sections.

```tsx
const sidebarConfig = {
  title: "Dashboard",
  groups: [
    {
      title: "Main",
      items: [
        { label: "Overview", href: "/dashboard", icon: Home },
        { label: "Analytics", href: "/analytics", icon: BarChart },
      ],
    },
    {
      title: "Settings",
      items: [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Preferences", href: "/preferences", icon: Settings },
      ],
    },
  ],
};
```

## Configuration Reference

### SidebarConfig

```typescript
interface SidebarConfig {
  title?: string; // Sidebar header title
  items?: SidebarItem[]; // Simple list (converted to single group)
  groups?: SidebarGroup[]; // Multiple grouped sections
}
```

### SidebarItem

```typescript
interface SidebarItem {
  label: string; // Display text
  href: string; // Navigation URL
  icon?: LucideIcon; // Optional icon component
  badge?: string | number; // Optional badge (e.g., "New", 5)
}
```

### SidebarGroup

```typescript
interface SidebarGroup {
  title?: string; // Group header
  items: SidebarItem[]; // Items in this group
}
```

## Responsive Behavior

- **Desktop**: Sidebar is fixed on the left, collapsible via button or `Cmd/Ctrl + B`
- **Mobile**: Sidebar becomes a Sheet (drawer) opened via hamburger menu

## Styling

The sidebar uses Tailwind CSS and follows the shadcn/ui design system:

- Colors: `bg-sidebar`, `text-sidebar-foreground`
- Active state: `bg-sidebar-accent`
- Proper spacing and typography tokens

## Role-Based Configuration

The dashboard layout (`app/dashboard/layout.tsx`) demonstrates role-based sidebar:

```tsx
const sidebarConfig: SidebarConfig = {
  title: "Therassist",
  groups: [
    {
      title: "Main",
      items: [{ label: "Dashboard", href: "/dashboard", icon: Home }],
    },
    ...(user.role === "therapist"
      ? [
          {
            title: "Therapist",
            items: [
              {
                label: "Clients",
                href: "/dashboard/therapists/clients",
                icon: Users,
              },
              {
                label: "Sessions",
                href: "/dashboard/therapists/sessions",
                icon: VideoIcon,
              },
            ],
          },
        ]
      : []),
  ],
};
```

## Default Fallback

If no configuration is provided, the sidebar displays a default:

```tsx
{
  title: "Dashboard",
  items: [
    { label: "Dashboard", href: "/dashboard", icon: Home }
  ]
}
```

## Best Practices

1. **Static when possible**: Use static config in layouts for better performance
2. **Clean up**: Always reset dynamic config in useEffect cleanup
3. **Icons**: Use lucide-react icons for consistency
4. **Badges**: Keep badge text short (1-2 chars or small numbers)
5. **Groups**: Use groups to organize 5+ items
6. **Routes**: Use absolute paths in `href` for consistency

## Examples

See `app/dashboard/layout.tsx` for a complete implementation example.
