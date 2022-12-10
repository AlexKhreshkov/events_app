import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "../utils/constants"

export interface IAuthModalState {
    isOpen: boolean
}
export interface IUser {
    id?: number,
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

export interface ISignUpInfo {
    email?: string,
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
    globalError?: string,
    non_field_errors?: string,
}

export interface IResponseAuthToken{
    auth_token: string
}

export interface IAuthToken{
    authToken: string
}
export interface IResponseStatus{
    status: number
}

export interface IActivateAccount{
    uid: string,
    token: string
}