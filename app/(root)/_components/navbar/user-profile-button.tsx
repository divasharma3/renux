"use client";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/payload-types";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

const UserProfileButton = ({ user }: { user: User }) => {
  const [position, setPosition] = useState("system");
  const { setTheme } = useTheme();
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm pl-2 pr-4 md:pr-2 md:pl-2">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-9 w-9 bg-slate-200 flex items-center justify-center cursor-pointer">
              <User2 className="h-6 w-6 text-slate-800" />
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[200px] dark:bg-[#0f111a]"
        align="end"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator className="border border-b" />
        <DropdownMenuItem className="w-full flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
         <Link href="/sell" className="flex items-center">
          <LayoutDashboard className="h-5 w-5 mr-2" />
          Seller Dashboard
         </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full py-0 px-0 flex text-muted-foreground dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="cursor-default w-full flex items-center justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileButton;
