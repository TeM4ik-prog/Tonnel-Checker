export function getTokenFromLocalStorage(): string | null {
    const token = localStorage.getItem('token')
    return token
}


export function setTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token)
}


export function removeTokenFromLocalStorage(): void {
    localStorage.removeItem('token')

}