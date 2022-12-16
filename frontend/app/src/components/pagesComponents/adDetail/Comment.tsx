import { Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/useRedux'
import { IUser } from '../../../types/types'
import { makeDateReadable } from '../../../utils/utils'

interface CommentProps {
    users: IUser[],
    user_id?: number,
    created?: string,
    updated?: string,
    text: string,
}

export const Comment: FC<CommentProps> = ({ user_id, users, created, updated, text }) => {

    const [author, setAuthor] = useState<IUser>()
    const currUser = useAppSelector(state => state.user.user)

    useEffect(() => {
        setAuthor(users.find(user => user.id === user_id))
    }, [])

    const deleteComment = () => {

    }
    const changeComment = () => {

    }

    return (
        <div className="comments__comment">
            <div className="comments__comment-author-img">
                <img src={author?.image} alt="" />
            </div>
            <div className="comments__comment-content">
                <div className="comments__comment-head">
                    <div className="comments__date">
                        Published: {updated ? makeDateReadable(updated): <div></div>}
                    </div>
                </div>
                <div className="comments__comment-author-name">{author?.username}</div>
                <div className="comments__text">
                    {text}
                </div>
                {currUser.authToken && author?.id === currUser.id
                    ?
                    <>
                        <div className="comments__comment-buttons">
                            <div className="comments__comment__delete">
                                <Button
                                    type='primary'
                                    onClick={() => changeComment()}
                                >
                                    CHANGE
                                </Button>
                                <Button
                                    type='primary'
                                    danger
                                    onClick={() => changeComment()}
                                >
                                    DELETE
                                </Button>
                            </div>
                        </div>
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    )
}
