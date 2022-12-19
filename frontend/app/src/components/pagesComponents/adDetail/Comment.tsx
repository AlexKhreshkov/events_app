import { Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteComment } from '../../../api/sendData'
import { useAppSelector } from '../../../hooks/useRedux'
import { IAd, IComment, IUser } from '../../../types/types'
import { getTokenFromLocalStorage, makeDateReadable } from '../../../utils/utils'
import { Loader } from '../../Loader'

interface CommentProps extends IComment {
    adComments: IComment[]
    setAdComments: React.Dispatch<React.SetStateAction<IComment[]>>
    adInfo: IAd
}

export const Comment: FC<CommentProps> = (props: CommentProps) => {

    const { id, user, name, text, created, updated, adComments, setAdComments, ad } = props
    const allUsers = useAppSelector(state => state.data.data.users)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const [commentAuthor, setCommentAuthor] = useState<IUser>()
    const [isLoading, setLoading] = useState(false)
    const [isCommentChanging, setCommentChanging] = useState(false)


    useEffect(() => {
        setCommentAuthor(allUsers.find(usr => usr.id === user))
    }, [])

    const deleteCommentHandler = () => {
        deleteComment(id, getTokenFromLocalStorage())
            .then(() => setLoading(true))
            .then(() => setAdComments([...adComments.filter(comment => comment.id !== id)]))
            .finally(() => setLoading(false))
    }
    const changeCommentHandler = () => {

    }

    return (
        <div className="comments__comment">
            {isLoading ? <Loader /> : <></>}
            <div className="comments__comment-author-img">
                <img src={commentAuthor?.image} alt="author-img" />
            </div>
            <div className="comments__comment-content">
                <div className="comments__comment-head">
                    <div className="comments__date">
                        Published: {updated ? makeDateReadable(updated) : <div></div>}
                    </div>
                </div>
                <div className="comments__comment-author-name">
                    {name}
                </div>
                <div className="comments__text">
                    {/* <form action="">
                        <textarea name="">
                            {text}
                        </textarea>
                    </form> */}
                    {text}
                </div>
                {commentAuthor?.id === currentUser.id && getTokenFromLocalStorage()
                    ?
                    <>
                        <div className="comments__comment-buttons">
                            <div className="comments__comment__delete">
                                <Button
                                    type='primary'
                                    onClick={() => changeCommentHandler()}
                                >
                                    CHANGE
                                </Button>
                                <Button
                                    type='primary'
                                    danger
                                    onClick={e => deleteCommentHandler()}
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
