-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "authDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "giftId" INTEGER NOT NULL,
    "giftNum" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "model" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "backdrop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "giftsDataUpdateId" TEXT,
    CONSTRAINT "Gift_giftsDataUpdateId_fkey" FOREIGN KEY ("giftsDataUpdateId") REFERENCES "GiftsDataUpdate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GiftsDataUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Gift_giftId_key" ON "Gift"("giftId");
