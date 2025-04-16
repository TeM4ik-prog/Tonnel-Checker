/*
  Warnings:

  - A unique constraint covering the columns `[userId,nft]` on the table `UserFilters` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserFilters_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserFilters_userId_nft_key" ON "UserFilters"("userId", "nft");
