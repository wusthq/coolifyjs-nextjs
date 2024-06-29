import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "@/styles/globals.scss";

import { cn } from "@/lib/utils";
import { Providers } from "./providers";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="h-full w-full">
      <body className={cn(inter.className, "h-full min-h-screen")}>
        <div className="h-full min-h-0 w-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
