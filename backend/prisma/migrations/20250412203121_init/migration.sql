/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "minProfit" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "value" REAL NOT NULL DEFAULT 0.5
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "authDate" DATETIME NOT NULL
);
INSERT INTO "new_User" ("authDate", "firstName", "id", "photoUrl", "telegramId") SELECT "authDate", "firstName", "id", "photoUrl", "telegramId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
