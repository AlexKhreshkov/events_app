import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from './constants'

export function checkLogin(login: string): boolean {
    return login.length >= MIN_LOGIN_LENGTH && login.length <= MAX_LOGIN_LENGTH
}

export function checkPassword(password: string): boolean {
    return password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH
}