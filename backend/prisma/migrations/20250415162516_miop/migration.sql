/*
  Warnings:

  - The primary key for the `GiftBackground` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftBackground" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "backdrop" TEXT NOT NULL,
    "centerColor" INTEGER NOT NULL,
    "edgeColor" INTEGER NOT NULL,
    "patternColor" INTEGER NOT NULL,
    "textColor" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "permille" INTEGER NOT NULL
);
INSERT INTO "new_GiftBackground" ("backdrop", "centerColor", "edgeColor", "id", "name", "patternColor", "permille", "textColor") SELECT "backdrop", "centerColor", "edgeColor", "id", "name", "patternColor", "permille", "textColor" FROM "GiftBackground";
DROP TABLE "GiftBackground";
ALTER TABLE "new_GiftBackground" RENAME TO "GiftBackground";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
