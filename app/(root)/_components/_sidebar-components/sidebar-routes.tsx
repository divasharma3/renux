"use client";

import {
  Compass,
  LayoutDashboard,
  LogIn,
  UserPlus
} from "lucide-react";
import SidebarItem from "./sidebarItem";

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/",
  },
  {
    icon: LogIn,
    label: "Sign In",
    href: "/sign-in",
  },  
  {
    icon: UserPlus,
    label: "Create account",
    href: "/sign-up",
  },
  {
    icon: Compass,
    label: "Explore Market",
    href: "/explore",
  },
];

const SidebarRoutes = () => {

  const route = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {route.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
