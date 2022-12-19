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
import { IAd, IAdAuthor, IComment, IUser } from '../types/types'
import { getTokenFromLocalStorage, reformatDate } from '../utils/utils'

export const AdDetail = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { adSlug } = useParams<{ adSlug: string }>()
    const allUsers = useAppSelector(state => state.data.data.users)
    const [adComments, setAdComments] = useState<IComment[]>([])
    const [ad, setAd] = useState<IAd>({
        id: -1,
        title: '',
        user_id: -1,
        phone: '',
        slug: '',
        text: '',
        image: '',
        category_id: '',
        category_name: '',
        category_slug: '',
        created: '',
        updated: '',
    })
    const adInfo = ad
    const [adAuthor, setAdAuthor] = useState<IAdAuthor>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const adResponse = await getAdBySlug(adSlug)
            const ad = adResponse.data
            setAd(ad)
            setAdAuthor(allUsers.find(user => user.id === ad.user_id))
            const commentsResponse = await getComments()
            setAdComments(commentsResponse.data.filter(comment => comment.ad === ad?.id))
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
                            <div className='back'>
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
                                                Contacts: {adAuthor?.first_name} {adAuthor?.last_name}
                                            </div>
                                            <div className="adDetail__phone">
                                                <IoPhonePortraitOutline />
                                                Phone: {adAuthor?.phone ? adAuthor?.phone : <span>-</span>}
                                            </div>
                                            <div className="adDetail__date">
                                                <IoTimeOutline />
                                                Published: {reformatDate(ad?.updated ? ad?.updated : 'F')}
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
                                {getTokenFromLocalStorage()
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
                                        adInfo={adInfo}
                                        {...comment}
                                    />
                                )}
                                {getTokenFromLocalStorage()
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
                        </div>
                    </div>
                </div>
            }
        </>
    )
}