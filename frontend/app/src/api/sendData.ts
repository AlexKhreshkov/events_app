import { IComment } from '../types/types';
import { ADD_COMMENT_URL, COMMENTS_URL } from '../utils/constants';

import axios from 'axios';

interface ICreateComment {
    name: string,
    text: string,
    ad: number,
    user: number,
    authToken: string,
}
interface IUpdateComment {
    id: number,
    name?: string,
    text?: string,
    authToken: string,
}
export function createComment(comment: ICreateComment) {
    return axios.post<IComment>(`${ADD_COMMENT_URL}`,
        comment,
        {
            headers: {
                Authorization: `Token ${comment.authToken}`,
            },
        },
    )
}

export function deleteComment(commentId: number, authToken: string) {
    return axios.delete(`${COMMENTS_URL}${commentId}/`,
        {
            headers: {
                Authorization: `Token ${authToken}`,
            },
        },
    )
}
export function changeComment(newComment: IUpdateComment) {
    return axios.patch(`${COMMENTS_URL}${newComment.id}/`,
        newComment,
        {
            headers: {
                Authorization: `Token ${newComment.authToken}`,
            },
        },
    )
}