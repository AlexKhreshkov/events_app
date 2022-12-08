import axios from "axios";
import { BASE_URL } from "../utils/constants";

export function getCategories(): Promise<any> {
    return axios.get(`${BASE_URL}/categories/`)
}

