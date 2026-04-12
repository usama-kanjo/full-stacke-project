-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerificationCode" VARCHAR(6),
ADD COLUMN     "emailVerificationExpires" TIMESTAMP(3),
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "users_emailVerificationCode_idx" ON "users"("emailVerificationCode");

-- CreateIndex
CREATE INDEX "users_isVerified_idx" ON "users"("isVerified");
