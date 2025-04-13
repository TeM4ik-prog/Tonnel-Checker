-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "authDate" DATETIME NOT NULL,
    "step" TEXT,
    "minProfit" REAL NOT NULL DEFAULT 0.5
);
INSERT INTO "new_User" ("authDate", "firstName", "id", "lastName", "photoUrl", "telegramId") SELECT "authDate", "firstName", "id", "lastName", "photoUrl", "telegramId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
