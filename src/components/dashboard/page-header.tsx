import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  right,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between gap-2",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h1 className="!my-0 text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="!my-0 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {right}
    </div>
  );
};
