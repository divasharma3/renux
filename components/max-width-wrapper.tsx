import { cn } from "@/lib/utils";
import React from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full lg:mt-0 mt-20 max-w-screen-xl px-2.5",
        className
      )}
    >
      {children}
    </div>
  );
};
