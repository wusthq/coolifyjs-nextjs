import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DashboardMobileTopbar } from "@/components/dashboard/topbar-mobile";
import { ModeToggle } from "@/components/toggle-dark-schema-button";
import type { User } from "@/types/user";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const coolifyVersion = "v4.0.0-beta.306";
  const coolifyJsNextVersion = "v.0.0.1";

  const user: User = {
    id: "1",
    name: "John Doe",
    email_address: "john@example.com",
    created_at: new Date(),
    updated_at: new Date(),
  };

  return (
    <div className="h-full min-h-0 w-full">
      <DashboardTopbar user={user} />
      <DashboardMobileTopbar user={user} />
      <div className="min-h-full">{children}</div>

      <footer className="border-t py-5">
        <div className="container flex justify-between">
          <div>
            <h5 className="text-sm font-normal text-foreground/50">
              Coolify: {coolifyVersion}
            </h5>

            <h5 className="text-sm font-normal text-foreground/50">
              coolifyjs/next: {coolifyJsNextVersion}
            </h5>
          </div>

          <ModeToggle />
        </div>
      </footer>
    </div>
  );
}
