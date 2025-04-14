
export class CreateUserDto {
    id: number
    first_name: string
    last_name: string
    is_premium: boolean
    username: string
}


export class UpdateUserDto {
    newName: string
}



export interface UserTonnelData {
    id: number;
    first_name: string;
    last_name: string | null;
    username: string;
    language_code: string;
    is_premium: boolean;
    allows_write_to_pm: boolean;
    photo_url: string;
}

export interface AuthTonnelData {
    user: UserTonnelData;
    chat_instance: string;
    chat_type: string;
    auth_date: number;
    signature: string;
    hash: string;
}