import { Button } from 'antd'
import React, { FC } from 'react'
import { useState } from 'react'
import { createComment } from '../../../api/sendData'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { addComment } from '../../../store/dataSlice'
import { IAd, IComment } from '../../../types/types'

interface CommentFormProps {
    ad?: IAd,
    adComments?: IComment[],
    setAddComments?: React.Dispatch<React.SetStateAction<IComment[] | undefined>>
}

export const CommentForm: FC<CommentFormProps> = ({ ad, adComments, setAddComments }) => {

    const dispatch = useAppDispatch()
    const curUser = useAppSelector(state => state.user.user)
    const name = useInput(curUser.username)
    const text = useInput('')
    const [error, setError] = useState('')
    const adCommentsArr = adComments ? adComments : []


    function sumbitCommentForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const comment = {
            name: name.value,
            text: text.value,
            ad: ad?.id,
            user: curUser.id,
            authToken: curUser.authToken,
        }
        createComment(comment)
            .catch(error => setError(error.response.data))
            .then(() => {
                text.setValue('')
                dispatch(addComment({
                    name: name.value,
                    text: text.value,
                    ad_id: ad?.id,
                    user_id: curUser.id,
                }))
                return setAddComments ? ([...adCommentsArr, comment]) : []
            })
    }

    return (
        <div className="comments__add-comment">
            <div className="comments__add-comment-wrapp">
                <form onSubmit={e => sumbitCommentForm(e)}>
                    <div className="comments__add-comment-title">
                        Add your comment
                    </div>
                    <div className="comments__add-comment-author-name">
                        Your name:
                    </div>
                    <div className="comments__add-comment-inputs">
                        <input
                            required
                            value={name.value}
                            onChange={e => name.setValue(e.target.value)}
                        />
                    </div>
                    <div className="comments__add-comment-subtitle">
                        <div className="comments__add-comment-your-comment">Your comment</div>
                    </div>
                    <div className="comments__add-comment-textarea">
                        <textarea
                            required
                            value={text.value}
                            onChange={e => text.setValue(e.target.value)}
                        />
                    </div>
                    <Button htmlType='submit' type='primary'>ADD</Button>
                </form>
            </div>
        </div>
    )
}