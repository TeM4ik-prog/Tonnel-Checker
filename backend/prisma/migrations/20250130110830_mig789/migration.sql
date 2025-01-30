/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VkUser` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `EmailUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GoogleUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TelegramUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserBase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VerificationCode` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Game_title_key";

-- DropIndex
DROP INDEX "VkUser_userBaseId_key";

-- DropIndex
DROP INDEX "VkUser_vkId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Game";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VkUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmailUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "userBaseId" TEXT NOT NULL,
    CONSTRAINT "EmailUser_userBaseId_fkey" FOREIGN KEY ("userBaseId") REFERENCES "UserBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EmailUser" ("email", "id", "password", "userBaseId") SELECT "email", "id", "password", "userBaseId" FROM "EmailUser";
DROP TABLE "EmailUser";
ALTER TABLE "new_EmailUser" RENAME TO "EmailUser";
CREATE UNIQUE INDEX "EmailUser_email_key" ON "EmailUser"("email");
CREATE UNIQUE INDEX "EmailUser_userBaseId_key" ON "EmailUser"("userBaseId");
CREATE TABLE "new_GoogleUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "userBaseId" TEXT NOT NULL,
    CONSTRAINT "GoogleUser_userBaseId_fkey" FOREIGN KEY ("userBaseId") REFERENCES "UserBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GoogleUser" ("email", "givenName", "id", "name", "photoUrl", "userBaseId") SELECT "email", "givenName", "id", "name", "photoUrl", "userBaseId" FROM "GoogleUser";
DROP TABLE "GoogleUser";
ALTER TABLE "new_GoogleUser" RENAME TO "GoogleUser";
CREATE UNIQUE INDEX "GoogleUser_email_key" ON "GoogleUser"("email");
CREATE UNIQUE INDEX "GoogleUser_userBaseId_key" ON "GoogleUser"("userBaseId");
CREATE TABLE "new_TelegramUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "authDate" DATETIME NOT NULL,
    "userBaseId" TEXT NOT NULL,
    CONSTRAINT "TelegramUser_userBaseId_fkey" FOREIGN KEY ("userBaseId") REFERENCES "UserBase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TelegramUser" ("authDate", "firstName", "id", "photoUrl", "telegramId", "userBaseId", "username") SELECT "authDate", "firstName", "id", "photoUrl", "telegramId", "userBaseId", "username" FROM "TelegramUser";
DROP TABLE "TelegramUser";
ALTER TABLE "new_TelegramUser" RENAME TO "TelegramUser";
CREATE UNIQUE INDEX "TelegramUser_telegramId_key" ON "TelegramUser"("telegramId");
CREATE UNIQUE INDEX "TelegramUser_userBaseId_key" ON "TelegramUser"("userBaseId");
CREATE TABLE "new_UserBase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL DEFAULT 'User',
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserBase" ("banned", "createdAt", "id", "role", "updatedAt") SELECT "banned", "createdAt", "id", "role", "updatedAt" FROM "UserBase";
DROP TABLE "UserBase";
ALTER TABLE "new_UserBase" RENAME TO "UserBase";
CREATE TABLE "new_VerificationCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EmailUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VerificationCode" ("code", "createdAt", "expiresAt", "id", "userId") SELECT "code", "createdAt", "expiresAt", "id", "userId" FROM "VerificationCode";
DROP TABLE "VerificationCode";
ALTER TABLE "new_VerificationCode" RENAME TO "VerificationCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
