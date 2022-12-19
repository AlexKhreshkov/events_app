import axios from "axios";
import { IComment } from "../types/types";
import { ADD_COMMENT_URL, COMMENTS_URL } from "../utils/constants";

interface ICreateComment {
    name: string,
    text: string,
    ad: number,
    user: number,
    authToken: string,
}

export function createComment(comment: ICreateComment) {
    return axios.post<IComment>(`${ADD_COMMENT_URL}`,
        comment,
        {
            headers: {
                Authorization: `Token ${comment.authToken}`,
            },
        }
    )
}

export function deleteComment(commentId: number, authToken: string) {
    return axios.delete(`${COMMENTS_URL}${commentId}/`,
        {
            headers: {
                Authorization: `Token ${authToken}`,
            },
        }
    )
}