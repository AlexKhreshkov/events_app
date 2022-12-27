import { ProfileBody } from '../components/pagesComponents/profile/ProfileBody';
import { ToMain } from '../components/UI/button/ToMain';
import { useAppSelector } from '../hooks/useRedux';
import { IUser } from '../types/types';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Profile = () => {

    const navigate = useNavigate()
    const [currentUserProfile, setCurrentUserProfile] = useState<IUser>()
    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.users.users)
    const user = users.find(user => user.id === currentUser.id)

    useEffect(() => {
        if (!user)
            return navigate('/')
        setCurrentUserProfile(user)
    }, [user])

    return (
        <div className='profile__container'>
            <div className='profile__content'>
                <ToMain />
                <div className='profile__header__container'>
                    <div className='profile__header'>
                        <div className='profile__header__img'>
                            <img src={currentUserProfile?.image} alt='' />
                        </div>
                        <div className='profile__header__username'>
                            {user?.username}
                        </div>
                    </div>
                </div>
                <ProfileBody />
            </div>
        </div>
    )
}
