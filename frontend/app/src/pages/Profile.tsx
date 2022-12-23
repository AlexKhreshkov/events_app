import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ProfileBody } from '../components/pagesComponents/profile/ProfileBody';
import { useAppSelector } from '../hooks/useRedux';
import { IUser } from '../types/types';


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
        <div className="profile__container">
            <div className="profile__content">
                <div className='profile__backBtn back'>
                    <Button onClick={e => navigate(-1)} type={'primary'}>
                        <IoArrowUndoOutline />
                        Back
                    </Button>
                </div>
                <div className="profile__header__container">
                    <div className="profile__header">
                        <div className="profile__header__img">
                            <img src={currentUserProfile?.image} alt="" />
                        </div>
                        <div className="profile__header__username">
                            {user?.username}
                        </div>
                    </div>
                </div>
                <ProfileBody />
            </div>
        </div>
    )
}
