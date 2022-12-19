export function deleteTokenFromLocalStorage(): void {
    localStorage.removeItem('authToken')
}
export function getTokenFromLocalStorage(): string {
    const authToken = localStorage.getItem('authToken')
    if (authToken)
        return authToken
    return ''
}
export function makeDateReadable(date: string): string {
    //DATE EXAMPLE 2022-12-15T10:05:07.105521Z
    const dateSlice = 19
    const readableDate = date.slice(0, dateSlice).replace('T', ':')
    return readableDate
}