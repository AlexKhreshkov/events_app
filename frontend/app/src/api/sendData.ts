import axios from "axios";
import { IComment } from "../types/types";
import { ADD_COMMENT_URL, COMMENTS_URL } from "../utils/constants";

interface ICreateComment {
    name: string,
    text: string,
    ad?: number,
    user?: number,
    authToken?: string,
}

// export function createComment(comment: ICreateComment) {
//     return axios.post(
//         `${ADD_COMMENT_URL}`,
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${comment.authToken}`,
//             },
//         },
//     )
// }

export function createComment(comment: ICreateComment) {
    return fetch(`${ADD_COMMENT_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${comment.authToken}`,
        },
        body: JSON.stringify(comment),
    })
}
export function deleteComment(commentId: number, authToken: string ) {
    return fetch(`${COMMENTS_URL}${commentId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`,
        },
    })
}