import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import NextLink from "next/link";

const linkVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary underline-offset-4 hover:underline",
      external: "text-blue-700 underline-offset-8 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  iconSize?: number;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, target, iconSize = 16, children, ...props }, ref) => {
    return (
      <NextLink
        className={cn("text-[inherit]", linkVariants({ variant, className }))}
        ref={ref}
        target={target ? target : variant === "external" ? "_blank" : undefined}
        {...props}
      >
        {children}

        {variant === "external" && (
          <ExternalLink
            className="mb-0.5 ml-1 inline-block"
            style={{ width: iconSize, height: iconSize }}
          />
        )}
      </NextLink>
    );
  },
);
Link.displayName = "Link";

export { Link, linkVariants };
