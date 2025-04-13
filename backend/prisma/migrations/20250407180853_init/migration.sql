-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackGiftsDataUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PackGiftsDataUpdate" ("id") SELECT "id" FROM "PackGiftsDataUpdate";
DROP TABLE "PackGiftsDataUpdate";
ALTER TABLE "new_PackGiftsDataUpdate" RENAME TO "PackGiftsDataUpdate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
