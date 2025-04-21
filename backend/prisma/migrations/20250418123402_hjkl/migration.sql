/*
  Warnings:

  - You are about to drop the `UserFilters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserFilters";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Filters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nft" TEXT NOT NULL,
    "models" JSONB NOT NULL,
    "backgrounds" JSONB NOT NULL,
    "symbols" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
