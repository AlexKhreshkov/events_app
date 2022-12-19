import { Button, Input, Switch } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { IoPerson } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { changeComment, deleteComment } from '../../../api/sendData'
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
    const [commentChangeName, setCommentChangeName] = useState(name)
    const [commentChangeText, setCommentChangeText] = useState(text)
    const authToken = getTokenFromLocalStorage()



    useEffect(() => {
        setCommentAuthor(allUsers.find(usr => usr.id === user))
    }, [])

    const deleteCommentHandler = () => {
        deleteComment(id, authToken)
            .then(() => setLoading(true))
            .then(() => setAdComments([...adComments.filter(comment => comment.id !== id)]))
            .finally(() => setLoading(false))
    }

    const changeCommentTextStatus = () => {
        setCommentChanging(!isCommentChanging)
        setCommentChangeText(text)
        setCommentChangeName(name)
    }

    const changeCommentHandler = () => {
        if (commentChangeName !== name || commentChangeText !== text) {
            const changedComment = {
                id,
                name: commentChangeName,
                text: commentChangeText,
                authToken
            }
            changeComment(changedComment)
                .catch(error => {
                    throw error
                })
                .then(() => {
                    setCommentChanging(false)
                })
        }
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
                {isCommentChanging
                    ?
                    <div className="comments__comment-author-name">
                        <Input
                            value={commentChangeName}
                            onChange={e => setCommentChangeName(e.target.value)}
                            placeholder='Your name...'
                        />
                    </div>
                    :
                    <div className="comments__comment-author-name displayFlex">
                        <IoPerson />
                        <span>{name}</span>
                    </div>

                }
                {isCommentChanging
                    ?
                    <Input.TextArea
                        style={{ resize: 'none', height: 120, margin: '20px 0' }}
                        placeholder='Your text...'
                        value={commentChangeText}
                        onChange={e => setCommentChangeText(e.target.value)}
                        required
                    />
                    :
                    <div>{commentChangeText}</div>
                }
                {commentAuthor?.id === currentUser.id && getTokenFromLocalStorage()
                    ?
                    <>
                        {isCommentChanging
                            ?
                            <Button
                                type='primary'
                                onClick={() => changeCommentHandler()}
                            >
                                Change
                            </Button>
                            :
                            <></>
                        }
                        <div className="comments__comment-buttons">
                            <div className="comments__comment__delete">
                                <Switch
                                    onClick={() => changeCommentTextStatus()}
                                    defaultChecked
                                    checkedChildren="Change comment"
                                    unCheckedChildren="Close"
                                />
                                <Button
                                    type='primary'
                                    danger
                                    size='small'
                                    onClick={e => deleteCommentHandler()}
                                >
                                    Delete comment
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
