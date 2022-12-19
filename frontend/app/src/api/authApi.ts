import axios from "axios";
import { IActivateAccount, IAuthToken, IResponseAuthToken, IResponseStatus, ISignInInfo, ISignUpInfo, ISignUpResponse, IResetPasswordConfirmation } from "../types/types";
import { ACTIVATE_ACCOUNT_URL, BASE_URL, DELETE_TOKEN_URL, REGISTER_USER_URL, RESET_PASSWORD_CONFIRMATION_URL, RESET_PASSWORD_URL } from "../utils/constants";



// {
//     "email": "",
//     "username": "testuser100",
//     "id": 2
// }

export function postSignUpDetails(authInfo: ISignUpInfo) {
    return axios.post(
        `${REGISTER_USER_URL}`,
        { ...authInfo },
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
    )
}
export function signIn(authInfo: ISignInInfo) {
    return axios.post<IResponseAuthToken>(
        `http://127.0.0.1:8000/auth/token/login/`,
        { ...authInfo },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
    )
}
export function getAuthToken(authInfo: ISignInInfo) {
    return axios.post<IResponseAuthToken>(
        `http://127.0.0.1:8000/auth/token/login/`,
        { ...authInfo },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
    )
}
export function defineUser(authToken: string) {
    return axios.get<ISignUpResponse>(
        `${BASE_URL}/auth/users/me/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
        },
    )
}
export function deleteTokenFromServer(authToken: string | null) {
    if (authToken) {
        return fetch(`${DELETE_TOKEN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`,
            },
        })
    }
}
export function activeAccount(accountEmailInfo: IActivateAccount) {
    return axios.post(
        `${ACTIVATE_ACCOUNT_URL}`,
        { ...accountEmailInfo },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
    )
}
export function resetPassword(email: string) {
    return axios.post(
        `${RESET_PASSWORD_URL}`,
        { email },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
    )
}
export function resetPasswordConfirmation(newPasswordsInfo: IResetPasswordConfirmation) {
    return axios.post(
        `${RESET_PASSWORD_CONFIRMATION_URL}`,
        newPasswordsInfo,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
    )
}