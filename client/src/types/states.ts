import { IUser } from "./auth";

export interface UserState {
    user: IUser | null;
    isAuth: boolean;
    updateTrigger: boolean;
    isLoading: boolean;
}