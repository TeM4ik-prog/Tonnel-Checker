/*
  Warnings:

  - Added the required column `profit` to the `GiftsDataUpdate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `GiftsDataUpdate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftsDataUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profit" REAL NOT NULL,
    "sellPrice" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GiftsDataUpdate" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "GiftsDataUpdate";
DROP TABLE "GiftsDataUpdate";
ALTER TABLE "new_GiftsDataUpdate" RENAME TO "GiftsDataUpdate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
