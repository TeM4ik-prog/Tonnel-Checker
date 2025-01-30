import { AxiosError } from 'axios';

export function handleError(error: unknown): string {
    if (error instanceof AxiosError) {
        return error.response?.data?.message || "Произошла ошибка при запросе. Попробуйте позже.";
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Произошла неизвестная ошибка. Попробуйте позже.";
}
