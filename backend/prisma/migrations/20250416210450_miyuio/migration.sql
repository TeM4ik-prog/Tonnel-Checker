-- CreateTable
CREATE TABLE "UserFilters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nft" TEXT NOT NULL,
    "models" JSONB NOT NULL,
    "backgrounds" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserFilters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE UNIQUE INDEX "UserFilters_userId_nft_key" ON "UserFilters"("userId", "nft");

-- CreateIndex
CREATE UNIQUE INDEX "GiftModel_name_key" ON "GiftModel"("name");
