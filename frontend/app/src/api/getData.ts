import axios from "axios";
import { CATEGORIES_URL, ADS_URL } from "../utils/constants";

export function getCategories() {
    return axios.get(`${CATEGORIES_URL}`)
}

export function getAds() {
    return axios.get(`${ADS_URL}`)
}
