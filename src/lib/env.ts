import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_COOLIFY_API_URL: z.string(),
    NEXT_PUBLIC_COOLIFY_API_VERSION: z.string(),
  },
  server: {
    COOLIFY_API_SECRET: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_COOLIFY_API_URL: process.env["NEXT_PUBLIC_COOLIFY_API_URL"],
    NEXT_PUBLIC_COOLIFY_API_VERSION:
      process.env["NEXT_PUBLIC_COOLIFY_API_VERSION"],
    COOLIFY_API_SECRET: process.env["COOLIFY_API_SECRET"],
  },
  emptyStringAsUndefined: true,
});
