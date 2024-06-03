import "dotenv/config";
import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

// export default {
//   schema: "./db/schema.ts",
//   out: "./drizzle",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// } satisfies Config;

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;
