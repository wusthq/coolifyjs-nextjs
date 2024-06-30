"use client";

import { useTeams } from "@/features/teams/api/use-teams";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const teams = useTeams();
  useEffect(() => {
    if (!teams.data) return;

    const firstTeam = teams.data?.[0];
    if (firstTeam) {
      return redirect(`/${firstTeam.id}`);
    } else {
      return redirect(`/new-team`);
    }
  }, [teams.data]);

  return null;
}
