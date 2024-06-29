"use client";

import { useTeams } from "@/features/teams/api/use-teams";
import { redirect } from "next/navigation";

export default function HomePage() {
  const teams = useTeams();
  const firstTeam = teams.data?.[0];
  if (firstTeam) {
    return redirect(`/${firstTeam.id}`);
  } else {
    return redirect(`/new-team`);
  }
}
