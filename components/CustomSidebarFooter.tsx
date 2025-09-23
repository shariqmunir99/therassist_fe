import { User2, Settings, ChevronUp } from "lucide-react";
import React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { settings } from "@/lib/constants";
import Image from "next/image";

const CustomSidebarFooter = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Image
                  src={settings.icon}
                  alt="settings"
                  width={24}
                  height={24}
                ></Image>
                {settings.title}

                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[14rem]">
              {settings.options.map((option) => (
                <DropdownMenuItem key={option.title}>
                  <a href={option.url}>
                    <span>{option.title}</span>
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default CustomSidebarFooter;
