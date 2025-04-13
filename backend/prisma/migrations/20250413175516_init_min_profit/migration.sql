/*
  Warnings:

  - You are about to drop the column `step` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `telegramId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" INTEGER NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "authDate" DATETIME NOT NULL,
    "minProfit" REAL NOT NULL DEFAULT 0.5
);
INSERT INTO "new_User" ("authDate", "firstName", "id", "lastName", "minProfit", "photoUrl", "telegramId") SELECT "authDate", "firstName", "id", "lastName", "minProfit", "photoUrl", "telegramId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
