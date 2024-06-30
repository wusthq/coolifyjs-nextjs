import { DashboardMain } from "@/components/dashboard/main";
import { SlugCookieUpdater } from "@/components/dashboard/slug-cookie-updater";
import { TeamSubmenu } from "@/components/dashboard/submenu";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

import type { ReactNode } from "react";

interface TeamLayoutProps {
  children: ReactNode;
  params: { teamId: number };
}

export default async function TeamLayout({
  children,
  params,
}: TeamLayoutProps) {
  const { teamId } = params;
  const user = await getCurrentUser();

  const userTeams = user.teams;
  const userTeam = userTeams.find((team) => team.id === teamId);
  if (!userTeam) notFound();

  return (
    <>
      <SlugCookieUpdater teamId={teamId} />
      <TeamSubmenu teamId={teamId} />
      <DashboardMain>{children}</DashboardMain>
    </>
  );
}
