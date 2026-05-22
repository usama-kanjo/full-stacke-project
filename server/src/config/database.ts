import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

export const prismaConnect = async (): Promise<void> => {
  try {
    await prisma.$connect();

    const healthCheck = await prisma.$queryRaw<
      [{ server_time: Date; postgres_version: string }]
    >`SELECT NOW() as server_time, version() as postgres_version`;

    console.log("=================================");
    console.log("✅ PRISMA POSTGRESQL CONNECTED");
    console.log("=================================");
    console.log(`🕐 Server Time: ${healthCheck[0]?.server_time}`);
    console.log(
      `🔧 PostgreSQL: ${healthCheck[0]?.postgres_version.split(" ").slice(0, 3).join(" ")}`,
    );
    console.log(
      `🌐 Connection: ${process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] || "localhost"}`,
    );
    console.log("=================================");
  } catch (err) {
    console.error("❌ PRISMA POSTGRESQL CONNECTION FAILED:");
    console.error(
      "Error Details:",
      err instanceof Error ? err.message : "Unknown error",
    );
    process.exit(1);// eslint-disable-line no-process-exit
  }
};
