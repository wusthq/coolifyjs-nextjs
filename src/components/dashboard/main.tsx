import { cn } from "@/lib/utils";
import { type ComponentPropsWithRef } from "react";

export const DashboardMain = ({
  className,
  ...props
}: ComponentPropsWithRef<"main">) => {
  return (
    <main
      className={cn("container h-full w-full py-4", className)}
      {...props}
    />
  );
};
