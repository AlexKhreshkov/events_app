import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    Col,
    Form,
    InputNumber,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Switch,
    Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ProfileBody } from '../components/pagesComponents/profile/ProfileBody';
import { useAppSelector } from '../hooks/useRedux';
import { IUser } from '../types/types';

const { Option } = Select;

export const Profile = () => {

    const navigate = useNavigate()
    const [currentUserProfile, setCurrentUserProfile] = useState<IUser>()
    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.users.users)


    useEffect(() => {
        setCurrentUserProfile(users.find(user => user.id === currentUser.id))
    }, [])


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
                            Alex123
                        </div>
                    </div>
                </div>
                <ProfileBody/>
            </div>
        </div>
    )
}
