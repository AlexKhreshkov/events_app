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
    if (date.length <= 19) {
        return 'WRONG DATE'
    }
    const dateSlice = 19
    const readableDate = date.slice(0, dateSlice).replace('T', ':')
    //2022-12-15:10:05:07
    return readableDate
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

function getFormattedDate(dateTimestamp: string, prefomattedDate = '', hideYear = '') {
    const dateInMs = Date.parse(dateTimestamp)
    const date = new Date(dateInMs)
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes: number | string
    minutes = date.getMinutes();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

// --- Main function
export function reformatDate(dateParam: string) {
    if (!dateParam) {
        return 'INVALID DATE';
    }
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today.getTime() - DAY_IN_MS);
    const seconds = Math.round((today.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();


    if (seconds < 5) {
        return 'now';
    } else if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 90) {
        return 'about a minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (isToday) {
        return getFormattedDate(date.toISOString(), 'Today'); // Today at 10:20
    } else if (isYesterday) {
        return getFormattedDate(date.toISOString(), 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
        return getFormattedDate(date.toISOString(), '', 'true'); // 10. January at 10:20
    }

    return getFormattedDate(date.toISOString()); // 10. January 2017. at 10:20
}