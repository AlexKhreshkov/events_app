import { Error } from './Error'

import { getAdBySlug, getComments } from '../api/getData'
import { Loader } from '../components/Loader'
import { AdComments } from '../components/pagesComponents/adDetail/AdComments'
import { PagesTitle } from '../components/PagesTitle'
import { RigthArea } from '../components/RigthArea'
import { ToMain } from '../components/UI/button/ToMain'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { changeAd, deleteAd } from '../store/adsSlice'
import { updateUserInfoNoImg } from '../store/usersSlice'
import { IAd, IAdAuthor, IAdChange, IChangeAdResponseError, IComment } from '../types/types'
import { reformatDate, slugify } from '../utils/utils'

import { ROUTES_PATH } from '../utils/constants'

import { changeSuccsessModalVisibility } from '../store/authModalSlice'

import { AdTitle } from '../components/pagesComponents/adDetail/AdTitle'

import { useNavigate, useParams } from 'react-router-dom'
import { IoPerson, IoPhonePortraitOutline, IoTimeOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Button, Input, Switch, message } from 'antd'


export const AdDetail = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [ad, setAd] = useState<IAd>()
    const { adSlug } = useParams<{ adSlug: string }>()
    const allUsers = useAppSelector(state => state.users.users)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const user = allUsers.find(user => user.id === ad?.user_id)
    const [adComments, setAdComments] = useState<IComment[]>([])
    const [adAuthor, setAdAuthor] = useState<IAdAuthor>()
    const [isLoading, setLoading] = useState(true)
    const [isAdChanging, setAdChanging] = useState(false)
    const [newAdInfo, setNewAdInfo] = useState<IAdChange>({
        first_name: '',
        last_name: '',
        phone: '',
        text: '',
        title: '',
    })
    const [messageApi, contextHolder] = message.useMessage()
    const [adDetailError, setAdDetailError] = useState(false)

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success!',
        });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const adResponse = await getAdBySlug(adSlug)
                const ad = adResponse.data
                setAd(ad)
                const user = allUsers.find(user => user.id === ad.user_id)
                if (user && ad) {
                    setAdAuthor(user)
                    setNewAdInfo({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone,
                        text: ad.text,
                        title: ad.title,
                    })
                }
                const commentsResponse = await getComments()
                setAdComments(commentsResponse.data.filter(comment => comment.ad === ad?.id))
                setLoading(false)
            } catch (error) {
                setAdDetailError(true)
            }
        }
        getData()
    }, [])

    const changeAdTextStatus = () => setAdChanging(!isAdChanging)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewAdInfo({ ...newAdInfo, [event.target.name]: event.target.value })
    }

    const handleDelete = async () => {
        const response = await dispatch(deleteAd(ad?.slug ? ad?.slug : ''))
        if (response.meta.requestStatus === 'fulfilled') {
            setTimeout(() => {
                dispatch(changeSuccsessModalVisibility(true))
            }, 500)
            return navigate(`${ROUTES_PATH.Main}`)
        }
        messageApi.error(response.payload)
    }

    function isReadOnlyInfo(item: any): item is IChangeAdResponseError {
        return 'title' in item || 'phone' in item || 'text' in item || 'slug' in item
    }

    const changeAdHandler = async () => {
        if (ad && newAdInfo) {
            const response = await dispatch(changeAd({ slug: ad.slug, newInfo: newAdInfo }))
            if (response.meta.requestStatus === 'fulfilled') {
                setAd({ ...ad, ...newAdInfo })
                if (adAuthor) {
                    setAdAuthor({ ...adAuthor, ...newAdInfo })
                }
                if (user) {
                    dispatch(updateUserInfoNoImg({ id: user?.id, newInfo: newAdInfo }))
                }
                setAdChanging(false)
                navigate(`/announcement/${slugify(newAdInfo.title)}`)
                success()
            }
            setAd({ ...ad, ...newAdInfo })
            if (response.meta.requestStatus === 'rejected') {
                const adFieldError = response.payload
                let errorString = ''
                if (isReadOnlyInfo(adFieldError)) {
                    for (const key in adFieldError) {
                        errorString += adFieldError[key as keyof IChangeAdResponseError]
                    }
                    messageApi.error(errorString)
                }
            }
        }
    }

    if (adDetailError) {
        return <Error />
    }

    if (!ad) {
        return <div>No ad</div>
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
                    <div className='content__lostSearch__container'>
                        <div className='content__adDetail'>
                            <ToMain />
                            <AdTitle
                                ad={ad}
                                handleChange={handleChange}
                                isCommentChanging={isAdChanging}
                                newAdInfoTitle={newAdInfo.title}
                            />
                            <div className='adDetail__body'>
                                <div className='adDetail__img'>
                                    <img src={ad?.image} alt='' />
                                </div>
                                <div className='adDetail__contancts__container'>
                                    <div className='adDetail__contancts'>
                                        <div className='adDetail__name'>
                                            {isAdChanging
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
                                                    <IoPhonePortraitOutline />:
                                                    <Input
                                                        name='phone'
                                                        value={newAdInfo.phone}
                                                        onChange={e => handleChange(e)}
                                                    />
                                                </>
                                                :
                                                <>
                                                    <IoPerson />
                                                    {adAuthor?.first_name} {adAuthor?.last_name}
                                                    <div className='adDetail__phone'>
                                                        <IoPhonePortraitOutline />
                                                        : {adAuthor?.phone ? adAuthor?.phone : <span>-</span>}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {isAdChanging
                                            ?
                                            <></>
                                            :
                                            <div className='adDetail__date'>
                                                <IoTimeOutline />
                                                {reformatDate(ad?.created ? ad?.created : '')}
                                            </div>
                                        }
                                        <div className='adDetail__textTittle'>
                                            Description
                                        </div>
                                        <div className='adDetail__text'>
                                            {isAdChanging
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
                                                        onClick={changeAdHandler}
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
                                        <div className='adDetail__switch__container'>
                                            <Switch
                                                onClick={() => changeAdTextStatus()}
                                                className='adDetail__switch'
                                                checked={!isAdChanging}
                                                checkedChildren='CHANGE AD'
                                                unCheckedChildren='Close'
                                            />
                                            <Button
                                                className='adDetail__switchBtn'
                                                type='primary'
                                                size='small'
                                                danger
                                                onClick={handleDelete}
                                            >
                                                DELETE
                                            </Button>
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
            }
        </>
    )
}