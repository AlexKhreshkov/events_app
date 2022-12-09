import axios from "axios";
import { IAuthToken, IResponseAuthToken, IResponseStatus, ISignUpInfo, ISignUpResponse } from "../types/types";
import { BASE_URL, DELETE_TOKEN_URL, REGISTER_USER_URL } from "../utils/constants";



// {
//     "email": "",
//     "username": "testuser100",
//     "id": 2
// }

export function postSignUpDetails(authInfo: ISignUpInfo) {
    return axios.post(
        // `${BASE_URL}/auth/users/`,
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
export function getAuthToken(authInfo: ISignUpInfo) {
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
export function deleteTokenFromServer(authToken: string) {
    return fetch(`${DELETE_TOKEN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
    })
}
export function signIn(authInfo: ISignUpInfo) {
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
