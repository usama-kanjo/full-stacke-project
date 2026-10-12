import "dotenv/config";
import { defineConfig } from "prisma/config";
import { databaseUrl } from "./src/config/databaseUrl.js";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
});
