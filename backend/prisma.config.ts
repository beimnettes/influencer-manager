import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts",
  },
  // datasource: {
  //   url: "postgresql://postgres:Feleke1234@localhost:5432/influencer_manager",
  // },
    datasource: {
    url: process.env.DATABASE_URL!,
  },

});
