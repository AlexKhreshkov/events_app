import { Button, Input } from 'antd'
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
            .catch(error => {
                setError(error.response.data)
                throw error
            })
            .then(commentResponse => {
                setAdComments([...adComments, commentResponse.data])
                name.setValue(currentUser.username)
                text.setValue('')
            })
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
                        <Input
                            style={{ margin: '0 0 20px 0' }}
                            value={name.value}
                            onChange={e => name.setValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="comments__add-comment-subtitle">
                        <div className="comments__add-comment-your-comment">Your comment</div>
                    </div>
                    <Input.TextArea
                        style={{ resize: 'none', height: 120, margin: '20px 0' }}
                        maxLength={1000}
                        required
                        value={text.value}
                        onChange={e => text.setValue(e.target.value)}
                    />
                    <Button htmlType='submit' type='primary'>ADD</Button>
                </form>
            </div>
        </div>
    )
}