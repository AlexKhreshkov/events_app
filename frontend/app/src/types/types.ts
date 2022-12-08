import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "../utils/constants"

export interface IAuthModalState {
    isOpen: boolean
}
export interface IUser {
    username: string,
    email?: string,
    authToken: string
}

export interface IValidations {
    isEmpty?: boolean,
    minLength?: number,
    maxLength?: number,
}

export enum EAvaliableValidators {
    isEmpty = 'isEmpty',
    minLength = 'minLength',
    maxLength = 'maxLength'
}
export interface ISignInInfo {
    username: string,
    password: string,
}
export interface ISignUpInfo {
    username: string,
    password: string,
}

export interface ISignUpResponse {
    email: string,
    username: string,
    id: number,
}

export interface IResponseAuthError{
    password?: string,
    username?: string,
    globalError?: string
}

export interface IAuthToken{
    authToken: string
}