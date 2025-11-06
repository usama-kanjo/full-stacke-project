/*
  Warnings:

  - You are about to drop the `_RoleToSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_RoleToSkill" DROP CONSTRAINT "_RoleToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_RoleToSkill" DROP CONSTRAINT "_RoleToSkill_B_fkey";

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "roleId" TEXT;

-- DropTable
DROP TABLE "public"."_RoleToSkill";

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
