import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { IoArrowUndoOutline, IoChatbubbleEllipsesOutline, IoPerson, IoPhonePortraitOutline, IoTimeOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { getAdBySlug, getComments } from '../api/getData'
import { Loader } from '../components/Loader'
import { Comment } from '../components/pagesComponents/adDetail/Comment'
import { PagesSubtitle } from '../components/PagesSubtitle'
import { PagesTitle } from '../components/PagesTitle'
import { RigthArea } from '../components/RigthArea'
import { CommentForm } from '../components/UI/forms/AddComment'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { changeSignUpVisibilityModal } from '../store/authModalSlice'
import { addComments } from '../store/dataSlice'
import { IAd, IComment, IUser } from '../types/types'
import { makeDateReadable } from '../utils/utils'

export const AdDetail = () => {

    const navigate = useNavigate()
    const { adSlug } = useParams<{ adSlug: string }>()
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.data.data.users)
    const comments = useAppSelector(state => state.data.data.comments)
    const [adComments, setAdComments] = useState<IComment[]>()
    const [user, setUser] = useState<IUser>()
    const currUser = useAppSelector(state => state.user.user)
    const [ad, setAd] = useState<IAd>()
    const [isLoading, setLoading] = useState(true)
    const emptyAd: IAd = {
        id: 0,
        title: '',
        user_id: 0,
        phone: '',
        slug: '',
        text: '',
        image: '',
        category_id: '',
        category_name: '',
        category_slug: '',
        created: '',
        updated: ''
    }

    useEffect(() => {
        const getData = async () => {
            const adResponse = await getAdBySlug(adSlug)
            const ad = adResponse.data
            setAd(ad)
            const foundUser = users.find(user => user.id === ad.user_id)
            setUser(foundUser)
            const commentsResponse = await getComments()
            dispatch(addComments(commentsResponse.data))
            setAdComments(commentsResponse.data.filter(comment => comment.ad_id === ad?.id))
            dispatch(addComments(commentsResponse.data))
            setLoading(false)
        }
        getData()
    }, [])


    return (
        <>
            {isLoading
                ?
                <Loader />
                :
                <div className='content__container'>
                    <RigthArea />
                    <PagesTitle />
                    <PagesSubtitle />
                    <div className="content__lostSearch__container">
                        <div className="content__adDetail">
                            <div className='back    '>
                                <Button onClick={e => navigate(-1)} type={'primary'}>
                                    <IoArrowUndoOutline />
                                    Back
                                </Button>
                            </div>
                            <div className='adDetail__title'>
                                {ad?.title}
                            </div>
                            <div className="adDetail__body">
                                <div className="adDetail__imgRow">
                                    <div className="adDetail__img">
                                        <img src={ad?.image} alt="" />
                                    </div>
                                    <div className="adDetail__contancts__container">
                                        <div className="adDetail__contancts">
                                            <div className="adDetail__name">
                                                <IoPerson />
                                                Contacts: {user?.first_name} {user?.last_name}
                                            </div>
                                            <div className="adDetail__phone">
                                                <IoPhonePortraitOutline />
                                                Phone: {user?.phone ? user?.phone : <span>-</span>}
                                            </div>
                                            <div className="adDetail__date">
                                                <IoTimeOutline />
                                                Published: {makeDateReadable(ad?.updated ? ad?.updated : 'F')}
                                            </div>
                                            <div className="adDetail__textTittle">
                                                Description
                                            </div>
                                            <div className="adDetail__text">
                                                {ad?.text}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="comments">
                                <div className="comments__count">
                                    <IoChatbubbleEllipsesOutline />
                                    Comments: {adComments?.length}
                                </div>
                                {currUser?.authToken
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
                                        user_id={comment.user_id}
                                        users={users}
                                        created={comment.created}
                                        updated={comment.updated}
                                        text={comment.text}
                                    />
                                )}
                                <CommentForm
                                    ad={ad}
                                    adComments={adComments}
                                    setAddComments={setAdComments}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}