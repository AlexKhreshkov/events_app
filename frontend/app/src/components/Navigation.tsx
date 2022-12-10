import { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoPersonOutline, IoHeartOutline, IoExitOutline } from "react-icons/io5";
import { LoginModal } from './UI/modal/LoginModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { changeLoaderFullSizeVisibility, changeSignInVisibility } from '../store/authModalSlice';
import { RegisterModal } from './UI/modal/RegisterModal';
import { deleteTokenFromUser } from '../store/authSlice';
import { deleteTokenFromLocalStorage } from '../utils/utils';
import { deleteTokenFromServer } from '../api/authApi';
import { Spin } from 'antd';
import { EmailModal } from './UI/modal/EmailModal';
import { SuccessRegisterModal } from './UI/modal/SuccessRegisterModal';
import { LoadingModal } from './UI/modal/LoadingModal';

export const Navigation = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignIn)
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const [isNavLoading, setNavLoading] = useState(false)

    const signOut = () => {
        new Promise<void>((resolve) => {
            setNavLoading(true)
            resolve()
        })
            .then(() => deleteTokenFromServer(user.authToken))
            .catch(error => {
                setNavLoading(false)
                throw error
            })
            .then(() => {
                dispatch(deleteTokenFromUser())
                deleteTokenFromLocalStorage()
            })
            .finally(() => setTimeout(() => setNavLoading(false), 2000))
    }

    return (
        <div className='nav__container'>
            <div className="nav">
                <Link to='/'>
                    <div className="nav__title">NZEvents</div>
                </Link>
                {isNavLoading
                    ?
                    <div className="nav__items">
                        <Spin />
                    </div>
                    :
                    <div className="nav__items">
                        {user.username && user.authToken
                            ?
                            <>
                                <div className="nav__item">
                                    <div className="">{user.username}</div>
                                </div>
                                <div
                                    className="nav__item"
                                    onClick={e => console.log('GOTO PROFILE')}
                                >
                                    <IoPersonOutline />
                                </div>
                                <div className="nav__item liked">
                                    <IoHeartOutline />
                                    <div className="liked_count">1</div>
                                </div>
                                <div
                                    className="nav__item"
                                    onClick={() => signOut()}
                                >
                                    <IoExitOutline />
                                </div>
                            </>
                            :
                            <>
                                <div
                                    className="nav__item"
                                    onClick={e => dispatch(changeSignInVisibility(!isOpen))}
                                >
                                    <IoPersonOutline />
                                </div>
                                <div className="nav__item liked">
                                    <IoHeartOutline />
                                    <div
                                        className="liked_count"
                                    >
                                        1</div>
                                </div>
                            </>
                        }
                    </div>
                }
            </div>
            <LoginModal />
            <RegisterModal />
            <EmailModal />
            <SuccessRegisterModal />
            <LoadingModal />
        </div>
    )
}
