"use client";

import { useEffect } from "react";
import { useSidebarConfig } from "@/components/sidebar";
import { Button } from "@/components/ui/button";

/**
 * Example page demonstrating dynamic sidebar configuration.
 *
 * This page sets its own sidebar content when it mounts,
 * showing a different navigation structure than the default dashboard.
 */
export default function ExampleDynamicSidebarPage() {
  const { setSidebarConfig } = useSidebarConfig();

  useEffect(() => {
    // Set custom sidebar configuration for this page
    setSidebarConfig({
      title: "Documents",
      groups: [
        {
          title: "Actions",
          items: [
            { label: "All Documents", href: "/example", icon: "FileText" },
            {
              label: "Downloads",
              href: "/example/downloads",
              icon: "Download",
              badge: "3",
            },
            { label: "Shared", href: "/example/shared", icon: "Share2" },
            { label: "Trash", href: "/example/trash", icon: "Trash2" },
          ],
        },
      ],
    });

    // Cleanup: reset sidebar config when component unmounts
    return () => {
      setSidebarConfig(null);
    };
  }, [setSidebarConfig]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dynamic Sidebar Example</h1>
        <p className="text-muted-foreground mt-2">
          This page demonstrates how to dynamically set sidebar content using
          the{" "}
          <code className="bg-muted px-1 py-0.5 rounded">useSidebarConfig</code>{" "}
          hook.
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            The page is a client component (<code>"use client"</code>)
          </li>
          <li>
            It uses the <code>useSidebarConfig</code> hook
          </li>
          <li>
            In <code>useEffect</code>, it calls <code>setSidebarConfig()</code>
          </li>
          <li>The sidebar updates to show the new navigation</li>
          <li>
            On unmount, it cleans up by resetting to <code>null</code>
          </li>
        </ol>
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Check the sidebar</h2>
        <p className="text-sm text-muted-foreground">
          Look at the sidebar on the left. It now shows "Documents" with custom
          navigation items including a badge on "Downloads". This is different
          from the default dashboard sidebar.
        </p>
        <Button>Example Action</Button>
      </div>

      <div className="bg-muted/50 border rounded-lg p-6">
        <h3 className="font-semibold mb-2">Code Example</h3>
        <pre className="text-xs bg-background p-4 rounded overflow-x-auto">
          {`"use client";

import { useEffect } from "react";
import { useSidebarConfig } from "@/components/sidebar";

export default function MyPage() {
  const { setSidebarConfig } = useSidebarConfig();

  useEffect(() => {
    setSidebarConfig({
      title: "My Page",
      items: [
        { label: "Item 1", href: "/item1", icon: Icon1 },
        { label: "Item 2", href: "/item2", icon: Icon2 },
      ],
    });

    return () => setSidebarConfig(null);
  }, [setSidebarConfig]);

  return <div>Page Content</div>;
}`}
        </pre>
      </div>
    </div>
  );
}
