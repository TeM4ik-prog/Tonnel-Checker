import { IGift } from "./gift";

export interface IGiftMessage {
    id: string;
    chatId: number;
    messageId: number;
    giftId: number;
    createdAt: Date;
    updatedAt: Date;
    hidden: boolean;
    userId: string;

    Gift: IGift;
}