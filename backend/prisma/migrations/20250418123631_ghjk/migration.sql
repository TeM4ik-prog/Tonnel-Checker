/*
  Warnings:

  - You are about to drop the `Filters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Filters";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserFilters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nft" TEXT NOT NULL,
    "models" JSONB NOT NULL,
    "backgrounds" JSONB NOT NULL,
    "symbols" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserFilters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFilters_userId_nft_key" ON "UserFilters"("userId", "nft");
