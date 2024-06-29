"use client";

import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/stores/workspace";
import type { User } from "@/types/user";
import { Slash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { TopbarLogo } from "./topbar-logo";
import { TopbarProjectSelectButton } from "./topbar-project-select-button";
import { TopbarTeamSelectButton } from "./topbar-team-select-button";

interface DashboardTopbarProps {
  user: User;
}

export const DashboardMobileTopbar = ({}: DashboardTopbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const workspace = useWorkspaceStore();
  const activeProject = workspace.getActiveProject();

  return (
    <>
      <div className={cn("h-[50px] border-b bg-white p-2 md:hidden")}>
        <div className="flex items-center gap-2">
          <TopbarTeamSelectButton compact={activeProject ? true : false} />
          <Slash
            size={12}
            className={cn("-rotate-12 opacity-20", { hidden: !activeProject })}
          />
          <TopbarProjectSelectButton />
        </div>
      </div>

      {/* Open / Close button */}
      <Button
        className={cn("absolute right-2 top-2 gap-1 rounded-full", {
          "fixed z-[100000]": isOpen,
        })}
        size="sm-icon"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative flex h-[16px] w-[16px] items-center justify-center">
          <div
            className={cn(
              "absolute h-[2px] w-full origin-center rotate-0 rounded bg-gray-500 transition-all duration-200",
              {
                "-rotate-45": isOpen,
                "translate-y-[-3px] rotate-0": !isOpen,
              },
            )}
          />
          <div
            className={cn(
              "absolute h-[2px] w-full origin-center rotate-0 rounded bg-gray-500 transition-all duration-200",
              {
                "rotate-45": isOpen,
                "translate-y-[3px] rotate-0": !isOpen,
              },
            )}
          />
        </div>
      </Button>

      {/* Content */}
      <div
        className={cn(
          "fixed left-0 top-0 z-[99999] h-[100dvh] w-[100dvw] overflow-y-scroll bg-white p-4",
          {
            "pointer-events-none -translate-x-full opacity-0": !isOpen,
            "translate-x-0 opacity-100": isOpen,
          },
        )}
      >
        <div className="flex flex-col">
          <TopbarLogo />
          <div className="h-[150px] border"> ... </div>
        </div>
      </div>
    </>
  );
};
