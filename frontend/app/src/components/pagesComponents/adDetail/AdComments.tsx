import { FC } from "react"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import { changeSignUpVisibilityModal } from "../../../store/authModalSlice"
import { IAd, IComment } from "../../../types/types"
import { getTokenFromLocalStorage } from "../../../utils/utils"
import { CommentForm } from "../../UI/forms/AddComment"
import { Comment } from './Comment'

interface AdCommentsProps {
    ad: IAd
    adComments: IComment[]
    setAdComments: React.Dispatch<React.SetStateAction<IComment[]>>
}

export const AdComments: FC<AdCommentsProps> = ({ad, adComments, setAdComments }) => {

    const currentUser = useAppSelector(state => state.user.currentUser)
    const dispatch = useAppDispatch()

    return (
        <div className="comments">
            <div className="comments__count">
                <IoChatbubbleEllipsesOutline />
                Comments: {adComments?.length}
            </div>
            {currentUser.username && getTokenFromLocalStorage()
                ?
                <></>
                :
                <div className='login-to-comment'>
                    <span
                        className='warningText cursorPointer'
                        onClick={e => dispatch(changeSignUpVisibilityModal(true))}
                    >
                        SignUp
                    </span>
                    <span> to add comment</span>
                </div>
            }
            {adComments?.map(comment =>
                <Comment
                    key={comment.id}
                    adComments={adComments}
                    setAdComments={setAdComments}
                    adInfo={ad}
                    {...comment}
                />
            )}
            {currentUser.username && getTokenFromLocalStorage()
                ?
                <CommentForm
                    ad={ad}
                    adComments={adComments}
                    setAdComments={setAdComments}
                />
                :
                <></>
            }
        </div>
    )
}
