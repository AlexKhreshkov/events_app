export enum ROUTES_PATH {
    Main = '/',
    Profile = '/profile',
    CreateAd = '/announcement/create',
    AdDetail = 'announcement/:adSlug',
    AccountActivation = 'activate/:uid/:token',
    ResetPassword = 'password/reset/confirm/:uid/:token'
}
export const MIN_LOGIN_LENGTH = 3
export const MAX_LOGIN_LENGTH = 20
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 20
export const AuthErrors = {
    emptyPassword: 'Pasword can\'t be empty',
    emptyLogin: 'Login can\'t be empty',
    emptyEmail: 'Email can\'t be empty',
    invalidPassword: `Password must be  ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} symbols`,
    invalidLogin: `Login must be from ${MIN_LOGIN_LENGTH} to ${MAX_LOGIN_LENGTH} symbols`,
    passwordsNotEqual: 'Passwords don\'t match',
    accountNotActivated: 'First, you need to activate your account. Please, check your email.',
}
export const emailValidationProps = {
    isEmpty: true,
}
export const loginValidationProps = {
    isEmpty: true,
    minLength: MIN_LOGIN_LENGTH,
    maxLength: MAX_LOGIN_LENGTH,
}
export const passwordValidationProps = {
    isEmpty: true,
    minLength: MIN_PASSWORD_LENGTH,
    maxLength: MAX_PASSWORD_LENGTH,
}

export const ADS_LIMIT = 6
export const AD_PATH_NAME = 'announcement'

export const BASE_URL = 'http://127.0.0.1:8000/api/v1'
export const TOKEN_URL = 'http://127.0.0.1:8000/api/auth'
export const REGISTER_USER_URL = 'http://127.0.0.1:8000/api/v1/auth/users/'
export const RECIEVE_TOKEN_URL = 'http://127.0.0.1:8000/api/auth/token/login/'
export const DEFINE_USER_URL = 'http://127.0.0.1:8000/api/v1/auth/users/me/'
export const DELETE_TOKEN_URL = 'http://127.0.0.1:8000/api/auth/token/logout/'
export const ACTIVATE_ACCOUNT_URL = 'http://127.0.0.1:8000/api/v1/auth/users/activation/'
export const RESET_PASSWORD_URL = 'http://127.0.0.1:8000/api/v1/auth/users/reset_password/'
export const RESET_PASSWORD_CONFIRMATION_URL = 'http://127.0.0.1:8000/api/v1/auth/users/reset_password_confirm/'
export const CATEGORIES_URL = 'http://127.0.0.1:8000/api/v1/categories/'
export const ADS_URL = 'http://127.0.0.1:8000/api/v1/announcements/'
export const USERS_URL = 'http://127.0.0.1:8000/api/v1/users/'
export const COMMENTS_URL = 'http://127.0.0.1:8000/api/v1/comments/'
export const ADD_COMMENT_URL = 'http://127.0.0.1:8000/api/v1/comments/create/'