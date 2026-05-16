import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

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
    process.exit(1);
  }
};
