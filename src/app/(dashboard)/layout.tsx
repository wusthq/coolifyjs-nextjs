import { ModeToggle } from "@/components/toggle-dark-schema-button";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-full min-h-0 w-full">
      <div>
        <ModeToggle />
      </div>
      <div>{children}</div>
    </div>
  );
}
