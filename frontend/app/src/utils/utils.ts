export function deleteTokenFromLocalStorage(): void {
    localStorage.removeItem('authToken')
}
export function getTokenFromLocalStorage(): string {
    const authToken = localStorage.getItem('authToken')
    if (authToken)
        return authToken
    return ''
}
export function reformatDateFullDate(date: string): string {
    //DATE EXAMPLE 2022-12-15T10:05:07.105521Z
    const dateSlice = 19
    const readableDate = date.slice(0, dateSlice).replace('T', ':')
    //2022-12-19:21:02:26
    return readableDate
}
export function reformatDate(date: string): string {
    //Created 1-23 houres || 1 day || 2 days ago...
    const minute = 3600
    const hour = 3600 * 1000
    const day = hour * 24
    const dateInMilliseconds = Date.parse(date)
    const now = new Date().valueOf()
    const diffrenseInMilliseconds = now - dateInMilliseconds
    const diffrenseInMinutes = diffrenseInMilliseconds / minute
    const diffrenseInHours = diffrenseInMilliseconds / hour
    if (diffrenseInMinutes < 1) {
        return `Now`
    }
    if (diffrenseInMinutes === 60) {
        return `1 hour ago`
    }
    if (diffrenseInHours < 1) {
        const minutesAgo = 60 * diffrenseInHours
        return `${Math.round(minutesAgo)} minutes ago`
    }
    if (diffrenseInHours < 24) {
        return `${Math.round(diffrenseInHours)} hours ago`
    }
    if (diffrenseInHours > 24) {
        const daysAgo = diffrenseInHours / 24
        const hours = diffrenseInHours % 24
        return `${Math.floor(daysAgo)} days ${hours} hours ago`
    }
    return `${Math.round(diffrenseInHours)} hours ago`
}
