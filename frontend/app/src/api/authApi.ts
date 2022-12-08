import axios from "axios";
import { IAuthToken, ISignUpInfo, ISignUpResponse } from "../types/types";
import { BASE_URL } from "../utils/constants";



// {
//     "email": "",
//     "username": "testuser100",
//     "id": 2
// }

export function postSignUpDetails(authInfo: ISignUpInfo) {
    return axios.post(
        `${BASE_URL}/auth/users/`,
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
    return axios.post<IAuthToken>(
        `http://127.0.0.1:8000/auth/token/login/`,
        { ...authInfo },
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
    )
}