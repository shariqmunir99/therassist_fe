# Sidebar System - Quick Reference

## Installation Complete ✅

The sidebar system is installed and ready to use. All code examples below are functional.

---

## Basic Usage

### 1️⃣ Static Configuration (Recommended)

```tsx
import { AppSidebar, SidebarConfig } from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Home, Settings } from "lucide-react";

const sidebarConfig: SidebarConfig = {
  title: "My App",
  items: [
    { label: "Home", href: "/", icon: Home },
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

---

### 2️⃣ Dynamic Configuration

```tsx
"use client";

import { useEffect } from "react";
import { useSidebarConfig } from "@/components/sidebar";
import { Home } from "lucide-react";

export default function MyPage() {
  const { setSidebarConfig } = useSidebarConfig();

  useEffect(() => {
    setSidebarConfig({
      title: "Custom Page",
      items: [{ label: "Home", href: "/", icon: Home }],
    });

    return () => setSidebarConfig(null);
  }, [setSidebarConfig]);

  return <div>My Content</div>;
}
```

---

### 3️⃣ Grouped Navigation

```tsx
const sidebarConfig: SidebarConfig = {
  title: "Dashboard",
  groups: [
    {
      title: "Main",
      items: [{ label: "Overview", href: "/dashboard", icon: Home }],
    },
    {
      title: "Settings",
      items: [{ label: "Profile", href: "/profile", icon: User }],
    },
  ],
};
```

---

### 4️⃣ With Badges

```tsx
{
  label: "Messages",
  href: "/messages",
  icon: Mail,
  badge: "5"  // or badge: 5
}
```

---

## Configuration Types

```typescript
interface SidebarConfig {
  title?: string;
  items?: SidebarItem[];
  groups?: SidebarGroup[];
}

interface SidebarItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string | number;
}

interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}
```

---

## Features

✅ **Responsive** - Desktop sidebar + mobile drawer  
✅ **Active highlighting** - Auto-detects current route  
✅ **Keyboard shortcut** - Cmd/Ctrl + B to toggle  
✅ **Collapsible** - Can be collapsed to icon-only mode  
✅ **Icons** - Lucide React icons supported  
✅ **Badges** - Show notifications or counts  
✅ **Groups** - Organize items into sections  
✅ **TypeScript** - Fully typed

---

## Live Examples

- **Dashboard**: `/dashboard` - Role-based sidebar
- **Demo Page**: `/dashboard/example-sidebar` - Dynamic configuration

---

## Documentation

- **Full Guide**: `components/sidebar/README.md`
- **Implementation**: See `app/dashboard/layout.tsx`
