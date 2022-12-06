export const LOGIN_ROUTE = '/login'
export const MIN_LOGIN_LENGTH = 3
export const MAX_LOGIN_LENGTH = 20
export const MIN_PASSWORD_LENGTH = 5
export const MAX_PASSWORD_LENGTH = 20
export const AuthErrors = {
    emptyPassword: `Pasword can't be empty`,
    emptyLogin: `Login can't be empty`,
    invalidPassword: `Password must be  ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH}`,
    invalidLogin: `Login must be from ${MIN_LOGIN_LENGTH} to ${MAX_LOGIN_LENGTH}`,
    passwordsNotEqual: `Passwords don't match`,
}