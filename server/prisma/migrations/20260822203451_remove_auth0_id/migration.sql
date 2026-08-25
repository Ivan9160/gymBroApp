/*
  Warnings:

  - You are about to drop the column `auth0_id` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_auth0_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth0_id";
