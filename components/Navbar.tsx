"use client";

import Image from "next/image";
import NavItem from "./NavItem";
import { defaultNavItems, profilePic } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Mobile Only */}
      <div className="min-md:hidden ">
        <Drawer direction="left">
          <DrawerTrigger className="font-bold">☰</DrawerTrigger>
          <DrawerContent className="min-w-[95vw]">
            <DrawerHeader>
              <DrawerTitle>
              <Link
                href=""
                className="flex cursor-pointer items-center gap-4 pt-8 max-sm:gap-2 max-sm:flex-1 text-[#0e131b]"
              >
                <Image
                  src="/icons/logo-1.svg"
                  alt="logo"
                  width={24}
                  height={24}
                ></Image>
                <h2 className="text-[#0e131b] text-2xl font-bold leading-tight tracking-[-0.015em]">
                  Therassist
                </h2>
              </Link>
              </DrawerTitle>
            </DrawerHeader>
            <ul className="flex flex-col h-full items-start">
              {defaultNavItems.map((navItem) => (
                <NavItem key={navItem.label} navItem={navItem} isMobile />
              ))}
            </ul>
          </DrawerContent>
        </Drawer>
      </div>

      <Link
        href=""
        className="flex justify-center items-center gap-4 max-sm:gap-2 max-sm:flex-1 text-[#0e131b]"
      >
        <Image
          src="/icons/logo-1.svg"
          alt="logo"
          width={24}
          height={24}
        ></Image>
        <h2 className="text-[#0e131b] text-xl font-bold leading-tight tracking-[-0.015em]">
          Therassist
        </h2>
      </Link>
      <div className="flex min-sm:flex-1  justify-end gap-8 max-sm:gap-4">
        <NavigationMenu viewport={false} className="max-md:hidden">
          <NavigationMenuList>
            {defaultNavItems.map((navItem) => (
              <NavItem key={navItem.label} navItem={navItem} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <button className="flex max-sm:hidden max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7ecf3] text-[#0e131b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <div
            className="text-[#0e131b]"
            data-icon="Bell"
            data-size="20px"
            data-weight="regular"
          >
            <Image
              src="icons/bell.svg"
              alt="notifications"
              width={20}
              height={20}
            />
          </div>
        </button>
        <Image
          src={profilePic}
          alt="profile-pic"
          width={40}
          height={40}
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
        />
      </div>
    </header>
  );
};

export default Navbar;
