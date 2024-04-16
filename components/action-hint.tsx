import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import { cn } from "@/lib/utils";
  import React from "react";
  
  interface ActionHintProps {
    children: React.ReactNode;
    description: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    align?: "center" | "start" | "end";
    asChild?: boolean;
    className?: string;
  }
  
  export const ActionHint = ({
    children,
    description,
    side = "right",
    sideOffset = 0,
    align,
    asChild,
    className,
  }: ActionHintProps) => {
    return (
      <>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild={asChild}>
              {children}
            </TooltipTrigger>
            <TooltipContent
              side={side}
              sideOffset={sideOffset}
              align={align}
              className={cn(
                "dark:bg-[#0b0b0b] dark:border-[#181b2b] dark:text-white border-none font-semibold",
                className
              )}
            >
              {description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    );
  };
  