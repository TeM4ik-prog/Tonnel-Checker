-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "minProfit" REAL NOT NULL DEFAULT 0.5
);
INSERT INTO "new_User" ("firstName", "id", "lastName", "minProfit", "telegramId", "username") SELECT "firstName", "id", "lastName", "minProfit", "telegramId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
