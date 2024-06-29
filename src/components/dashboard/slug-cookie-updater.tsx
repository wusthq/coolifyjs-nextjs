"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface SlugCookieUpdaterProps {
  teamId?: string;
}

export const SlugCookieUpdater = ({ teamId }: SlugCookieUpdaterProps) => {
  const mutation = useMutation({
    mutationFn: async ({ teamId }: { teamId?: string }) => {
      await fetch("/api/cookies", {
        method: "POST",
        body: JSON.stringify({
          teamId,
        }),
      });
    },
  });

  useEffect(() => {
    mutation.mutate({ teamId });
  }, [teamId]);

  return null;
};
