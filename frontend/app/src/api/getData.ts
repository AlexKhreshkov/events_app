import axios from "axios";
import { IAd, ICategory, IComment, IUser } from "../types/types";
import { CATEGORIES_URL, ADS_URL, USERS_URL, COMMENTS_URL } from "../utils/constants";


export function getCategories() {
    return axios.get<ICategory[]>(`${CATEGORIES_URL}`)
}

export function getAds() {
    return axios.get<IAd[]>(`${ADS_URL}`)
}

export function getAdBySlug(slug?: string) {
    return axios.get<IAd>(`${ADS_URL}${slug}/`)
}
export function getUsers() {
    return axios.get<IUser[]>(`${USERS_URL}`)
}
export function getComments() {
    return axios.get<IComment[]>(`${COMMENTS_URL}`)
}