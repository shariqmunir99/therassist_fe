"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavItemProps {
  navItem: navItem;
  isMobile?: boolean;
}

type navItem = {
  label: string;
  url: string;
  isDropdown: boolean;
  dropdown: navItem[];
};

const NavItem = ({ navItem, isMobile = false }: NavItemProps) => {
  const { url, label, isDropdown, dropdown } = navItem;
  const path_name = usePathname();

  if (isMobile) {
    return (
      <li className="flex flex-col !text-xl w-full px-6 border-y-border border-y py-4 border-solid">
        {!isDropdown ? (
          <Link
            href={url}
            className={cn(
              "py-2 rounded hover:bg-muted",
              path_name === url && "text-primary font-semibold"
            )}
          >
            {label}
          </Link>
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl py-2">
                {label}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2 pl-4">
                  {dropdown.map((item) => (
                    <li key={item.label} className="text-base mt-4">
                      <Link
                        href={item.url}
                        className={cn(
                          "block py-2 rounded hover:bg-muted",
                          path_name === item.url && "text-primary font-semibold"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </li>
    );
  }

  return (
    <NavigationMenuItem>
      {!isDropdown ? (
        <NavigationMenuLink
          asChild
          className={cn(path_name === url && "text-primary font-semibold")}
        >
          <Link href={url}>{label}</Link>
        </NavigationMenuLink>
      ) : (
        <>
          <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              {dropdown.map((item) => (
                <li key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link href={item.url}>{item.label}</Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </>
      )}
    </NavigationMenuItem>
  );
};

export default NavItem;
