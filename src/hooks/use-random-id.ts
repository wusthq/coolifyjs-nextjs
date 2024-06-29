"use client";

import { nanoid } from "nanoid";
import { useMemo } from "react";
interface UseRandomIdProps {
  prefix?: string;
  suffix?: string;
  length?: number;
}
export const useRandomId = ({
  prefix = "",
  suffix = "",
  length = 8,
}: UseRandomIdProps): string => {
  const id = useMemo(() => {
    const id = nanoid(length);
    return `${prefix ? `${prefix}_` : ""}${id}${suffix ? `_${suffix}` : ""}`;
  }, [prefix, suffix, length]);
  return id;
};
