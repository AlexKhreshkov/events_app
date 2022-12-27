import { Button, Input, message, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { IoArrowUndoOutline, IoPerson, IoPhonePortraitOutline, IoTimeOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { getAdBySlug, getComments } from '../api/getData'
import { Loader } from '../components/Loader'
import { AdComments } from '../components/pagesComponents/adDetail/AdComments'
import { PagesTitle } from '../components/PagesTitle'
import { RigthArea } from '../components/RigthArea'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { changeAd } from '../store/adsSlice'
import { updateUserInfoNoImg } from '../store/usersSlice'
import { IAd, IAdAuthor, IAdChange, IComment } from '../types/types'
import { reformatDate } from '../utils/utils'

export const AdDetail = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [ad, setAd] = useState<IAd>()
    const { adSlug } = useParams<{ adSlug: string }>()
    const allUsers = useAppSelector(state => state.users.users)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const user = allUsers.find(user => user.id === ad?.user_id)
    const [adComments, setAdComments] = useState<IComment[]>([])
    const [adAuthor, setAdAuthor] = useState<IAdAuthor>()
    const [isLoading, setLoading] = useState(true)
    const [isCommentChanging, setCommentChanging] = useState(false)
    const [newAdInfo, setNewAdInfo] = useState<IAdChange>({
        first_name: '',
        last_name: '',
        phone: '',
        text: '',
        title: '',
    })
    const [messageApi, contextHolder] = message.useMessage()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success!',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'An uknow error occured',
        });
    };

    useEffect(() => {
        const getData = async () => {
            const adResponse = await getAdBySlug(adSlug)
            const ad = adResponse.data
            if (ad) {
                setAd(ad)
            }
            const user = allUsers.find(user => user.id === ad.user_id)
            if (user && ad) {
                setAdAuthor(user)
                setNewAdInfo({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    phone: user.phone,
                    text: ad.text,
                    title: ad.title
                })
            }
            const commentsResponse = await getComments()
            setAdComments(commentsResponse.data.filter(comment => comment.ad === ad?.id))

            setLoading(false)
        }
        getData()
    }, [adSlug])

    const changeCommentTextStatus = () => {
        setCommentChanging(!isCommentChanging)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewAdInfo({ ...newAdInfo, [event.target.name]: event.target.value })
    }
    function changeCommentHandler(): void {
        async function makeRequest() {
            if (ad && newAdInfo) {
                const response = await dispatch(
                    changeAd({ slug: ad.slug, newInfo: newAdInfo })
                )
                if (response.meta.requestStatus === 'fulfilled') {
                    success()
                    setAd({ ...ad, ...newAdInfo })
                    if (adAuthor) {
                        setAdAuthor({ ...adAuthor, ...newAdInfo })
                    }
                    if (user) {
                        dispatch(updateUserInfoNoImg({ id: user?.id, newInfo: newAdInfo }))
                    }
                    setCommentChanging(false)
                }
                if (response.meta.requestStatus === 'rejected') {
                    error()
                }
            }
        }
        makeRequest()
    }

    return (
        <>
            {contextHolder}
            {isLoading
                ?
                <Loader />
                :
                <div className='content__container'>
                    <RigthArea />
                    <PagesTitle />
                    <div className="content__lostSearch__container">
                        <div className="content__adDetail">
                            <div className='back'>
                                <Button onClick={e => navigate(-1)} type={'primary'}>
                                    <IoArrowUndoOutline />
                                    Back
                                </Button>
                            </div>
                            <div className='adDetail__title'>
                                {isCommentChanging
                                    ?
                                    <div className='displayFlex'>
                                        Title: <Input
                                            name='title'
                                            value={newAdInfo.title}
                                            onChange={e => handleChange(e)}
                                        />
                                    </div>
                                    :
                                    <>
                                        {ad?.title}

                                    </>
                                }
                            </div>
                            <div className="adDetail__body">
                                <div className="adDetail__imgRow">
                                    <div className="adDetail__img">
                                        <img src={ad?.image} alt="" />
                                    </div>
                                    <div className="adDetail__contancts__container">
                                        <div className="adDetail__contancts">
                                            <div className="adDetail__name">
                                                {isCommentChanging
                                                    ?
                                                    <>
                                                        <IoPerson />Name:
                                                        <Input
                                                            name='first_name'
                                                            value={newAdInfo.first_name}
                                                            onChange={e => handleChange(e)}
                                                        />
                                                        <IoPerson />Surname:
                                                        <Input
                                                            name='last_name'
                                                            value={newAdInfo.last_name}
                                                            onChange={e => handleChange(e)}
                                                        />
                                                        <IoPhonePortraitOutline /> Phone:
                                                        <Input
                                                            name='phone'
                                                            value={newAdInfo.phone}
                                                            onChange={e => handleChange(e)}
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <IoPerson />
                                                        Contacts:{adAuthor?.first_name} {adAuthor?.last_name}
                                                        <div className="adDetail__phone">
                                                            <IoPhonePortraitOutline />
                                                            Phone: {adAuthor?.phone ? adAuthor?.phone : <span>-</span>}
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            {isCommentChanging
                                                ?
                                                <></>
                                                :
                                                <div className="adDetail__date">
                                                    <IoTimeOutline />
                                                    Published: {reformatDate(ad?.created ? ad?.created : '')}
                                                </div>
                                            }
                                            <div className="adDetail__textTittle">
                                                Description
                                            </div>
                                            <div className="adDetail__text">
                                                {isCommentChanging
                                                    ?
                                                    <>
                                                        <Input.TextArea
                                                            style={{ resize: 'none', height: 120, margin: '5px 0' }}
                                                            name='text'
                                                            placeholder='Your text...'
                                                            value={newAdInfo?.text}
                                                            onChange={e => handleChange(e)}
                                                            required
                                                        />
                                                        <Button
                                                            type='primary'
                                                            onClick={() => changeCommentHandler()}
                                                        >
                                                            Change
                                                        </Button>
                                                    </>
                                                    :
                                                    <>
                                                        {ad?.text}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        {currentUser.id === adAuthor?.id
                                            ?
                                            <div className="adDetail__switch__container">
                                                <Switch
                                                    onClick={() => changeCommentTextStatus()}
                                                    className='adDetail__switch'
                                                    checked={!isCommentChanging}
                                                    checkedChildren="CHANGE AD"
                                                    unCheckedChildren="Close"
                                                />
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            {ad
                                ?
                                <AdComments
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
            }
        </>
    )
}