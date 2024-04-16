import React from "react";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MobileSidebar from "../_sidebar-components/mobile-sidebar";
import { NavItems } from "./nav-items";

const font = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = ({
  title
}: {
  title?: string
}) => {
  return (
    <div className="flex items-center gap-y-4">
      <MobileSidebar />
      <Link href="/" className="flex items-center">
        <div className="rounded-full p-1 shrink-0 lg:shrink lg:mr-0">
          <Image src="/logo.png" alt="" height={30} width={30} />
        </div>
        <div className={cn("flex flex-col items-center", font.className)}>
          <p className="text-2xl font-semibold">
            {title}
          </p>
        </div>
      </Link>
      <div className="ml-6 lg:block hidden">
        <NavItems />
      </div>
    </div>
  );
};
