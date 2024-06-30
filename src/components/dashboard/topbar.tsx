"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/stores/workspace";
import type { User } from "@/types/user";
import { Slash } from "lucide-react";
import { TopbarLogo } from "./topbar-logo";
import { TopbarProjectSelectButton } from "./topbar-project-select-button";
import { TopbarTeamSelectButton } from "./topbar-team-select-button";

interface DashboardTopbarProps {
  user: User;
}

export const DashboardTopbar = ({ user }: DashboardTopbarProps) => {
  const workspace = useWorkspaceStore();
  const activeProject = workspace.getActiveProject();

  return (
    <div
      className={cn(
        "max-md:hidden",
        "z-20 flex h-[60px] items-center justify-between bg-background px-4",
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-5">
        <TopbarLogo />
        <Slash size={12} className="-rotate-12 opacity-20" />
        <TopbarTeamSelectButton />
        <Slash
          size={12}
          className={cn("-rotate-12 opacity-20", { hidden: !activeProject })}
        />
        <TopbarProjectSelectButton />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Avatar>
          {/* <AvatarImage src={`https://avatar/${user.email_address}`} /> */}
          <AvatarFallback>
            {user.name.split(" ")[0]}
            {user.name.split(" ")[1]}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
