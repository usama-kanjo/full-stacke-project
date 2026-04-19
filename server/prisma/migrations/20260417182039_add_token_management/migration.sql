-- AlterTable
ALTER TABLE "users" ADD COLUMN     "maxActiveSessions" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "validTokens" TEXT[] DEFAULT ARRAY[]::TEXT[];
