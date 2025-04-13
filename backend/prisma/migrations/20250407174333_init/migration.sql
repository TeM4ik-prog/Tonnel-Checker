-- CreateTable
CREATE TABLE "PackGiftsDataUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftsDataUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profit" REAL NOT NULL,
    "sellPrice" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "packGiftsDataUpdateId" TEXT,
    CONSTRAINT "GiftsDataUpdate_packGiftsDataUpdateId_fkey" FOREIGN KEY ("packGiftsDataUpdateId") REFERENCES "PackGiftsDataUpdate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GiftsDataUpdate" ("createdAt", "id", "profit", "sellPrice", "updatedAt") SELECT "createdAt", "id", "profit", "sellPrice", "updatedAt" FROM "GiftsDataUpdate";
DROP TABLE "GiftsDataUpdate";
ALTER TABLE "new_GiftsDataUpdate" RENAME TO "GiftsDataUpdate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
