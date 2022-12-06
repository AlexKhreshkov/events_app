import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "../utils/constants"

export interface IAuthModalState {
    isOpen: boolean
}
export interface IUser {
    id: number,
    username: string,
    email?: string,
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