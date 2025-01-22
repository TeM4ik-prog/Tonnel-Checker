export interface IEmailAuth {
    email: string
}

export interface ITelegramAuth {
    id: number;
    first_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
}

export interface IGoogleAuth {
    clientId?: string;
    credential: string;
    select_by?: string;

}