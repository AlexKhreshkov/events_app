import { Button } from 'antd'
import React, { FC } from 'react'
import { useState } from 'react'
import { createComment } from '../../../api/sendData'
import { useInput } from '../../../hooks/useInput'
import { useAppSelector } from '../../../hooks/useRedux'
import { IAd, IComment } from '../../../types/types'
import { getTokenFromLocalStorage } from '../../../utils/utils'
import { Loader } from '../../Loader'

interface CommentFormProps {
    ad: IAd,
    adComments: IComment[]
    setAdComments: React.Dispatch<React.SetStateAction<IComment[]>>
}

export const CommentForm: FC<CommentFormProps> = ({ ad, adComments, setAdComments }) => {

    const currentUser = useAppSelector(state => state.user.currentUser)
    const name = useInput(currentUser.username)
    const text = useInput('')
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')


    function sumbitCommentForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const comment = {
            user: currentUser.id,
            ad: ad.id,
            name: name.value,
            text: text.value,
            authToken: getTokenFromLocalStorage()
        }
        setLoading(true)
        createComment(comment)
            .then(commentResponse => {
                setAdComments([...adComments, commentResponse.data])
            })
            .catch(error => setError(error.response.data))
            .finally(() => setLoading(false))
    }

    return (
        <div className="comments__add-comment">
            {isLoading ? <Loader /> : <></>}
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