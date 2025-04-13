export class CreateGiftDto {
    gift_num: number;
    customEmojiId: string;
    gift_id: number;
    name: string;
    model: string;
    asset: string;
    symbol: string;
    backdrop: string;
    availabilityIssued: number;
    availabilityTotal: number;
    backdropData: Record<string, any>;
    message_in_channel: number;
    price: number;
    status: string;
    limited: boolean;
    auction: any | null;
    export_at: string;
}
