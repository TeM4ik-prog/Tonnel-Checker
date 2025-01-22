import { IUser } from ".";

export interface UserState {
    user: IUser | null;
    isAuth: boolean;
    updateTrigger: boolean;
    isLoading: boolean;
}