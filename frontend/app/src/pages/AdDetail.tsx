import { useEffect, useState } from 'react'
import { IoPerson, IoPhonePortraitOutline, IoTimeOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { getAdBySlug } from '../api/getData'
import { Loader } from '../components/Loader'
import { PagesSubtitle } from '../components/PagesSubtitle'
import { PagesTitle } from '../components/PagesTitle'
import { RigthArea } from '../components/RigthArea'
import { useAppSelector } from '../hooks/useRedux'
import { IAd, IUser } from '../types/types'

export const AdDetail = () => {

    const { adSlug } = useParams<{ adSlug: string }>()
    const [ad, setAd] = useState<IAd>()
    const [isLoading, setLoading] = useState(true)
    const users = useAppSelector(state => state.data.data.users)
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        getAdBySlug(adSlug)
            .then(response => response.data)
            .then(data => {
                setAd(data)
                return data.user_id
            })
            .then((user_id) => {
                const foundUser = users.find(user => user.id === user_id)
                setUser(foundUser)
            })
            .finally(() => setLoading(false))


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
                                                Published: {ad?.updated}
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
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
