-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "authTonnelData" TEXT,
    "minProfit" REAL NOT NULL DEFAULT 0.5
);

-- CreateTable
CREATE TABLE "UserFilters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nft" TEXT NOT NULL,
    "models" JSONB NOT NULL,
    "backgrounds" JSONB NOT NULL,
    "symbols" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserFilters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "profit" REAL NOT NULL,
    "sellPrice" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "packGiftsDataUpdateId" TEXT,
    CONSTRAINT "GiftsDataUpdate_packGiftsDataUpdateId_fkey" FOREIGN KEY ("packGiftsDataUpdateId") REFERENCES "PackGiftsDataUpdate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PackGiftsDataUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ActiveChat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" INTEGER NOT NULL,
    "userTelegramId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GoodPriceMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GiftModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "models" JSONB NOT NULL,
    "backgrounds" JSONB NOT NULL,
    "symbols" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "GiftBackground" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "backdrop" TEXT NOT NULL,
    "centerColor" INTEGER NOT NULL,
    "edgeColor" INTEGER NOT NULL,
    "patternColor" INTEGER NOT NULL,
    "textColor" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "permille" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFilters_userId_nft_key" ON "UserFilters"("userId", "nft");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveChat_chatId_userTelegramId_key" ON "ActiveChat"("chatId", "userTelegramId");

-- CreateIndex
CREATE UNIQUE INDEX "GoodPriceMessage_chatId_messageId_key" ON "GoodPriceMessage"("chatId", "messageId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftModel_name_key" ON "GiftModel"("name");
