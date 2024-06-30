"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface SlugCookieUpdaterProps {
  teamId?: number;
}

export const SlugCookieUpdater = ({ teamId }: SlugCookieUpdaterProps) => {
  const mutation = useMutation({
    mutationFn: async ({ teamId }: { teamId?: number }) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  return null;
};
