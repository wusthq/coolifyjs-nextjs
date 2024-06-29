"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Toaster } from "sonner";

const queryClient = new QueryClient();

import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="left" initialIsOpen={false} />
        {children}

        <Toaster
          toastOptions={{
            closeButton: true,
            style: {
              fontWeight: "lighter",
            },
            classNames: {
              toast: "text-[15px] pr-16",
              closeButton: "bg-white",
              error: "bg-red-50 text-red-700 border border-red-400",
              warning: "bg-orange-50 text-orange-700 border border-orange-400",
              success: "bg-indigo-500 text-white border border-indigo-800",
              info: "bg-blue-50 text-blue-700 border border-blue-400",
            },
          }}
        />
      </QueryClientProvider>
    </NextThemesProvider>
  );
};
