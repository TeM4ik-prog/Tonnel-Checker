/*
  Warnings:

  - A unique constraint covering the columns `[chatId,userTelegramId]` on the table `ActiveChat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chatId,messageId]` on the table `GoodPriceMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActiveChat_chatId_userTelegramId_key" ON "ActiveChat"("chatId", "userTelegramId");

-- CreateIndex
CREATE UNIQUE INDEX "GoodPriceMessage_chatId_messageId_key" ON "GoodPriceMessage"("chatId", "messageId");
