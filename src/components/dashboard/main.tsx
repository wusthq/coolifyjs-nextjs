import { cn } from "@/lib/utils";
import { type ComponentPropsWithRef } from "react";

export const DashboardMain = ({
  className,
  ...props
}: ComponentPropsWithRef<"main">) => {
  return (
    <main className={cn("h-full w-full px-4 py-4", className)} {...props} />
  );
};
