import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoPersonOutline, IoHeartOutline, IoExitOutline, IoMoonOutline, IoMoon } from "react-icons/io5";
import { SignInModal } from './UI/modal/DataInputModal/SignInModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { changeSignInVisibilityModal } from '../store/authModalSlice';
import { SignUpModal } from './UI/modal/DataInputModal/SignUpModal';
import { deleteTokenFromLocalStorage, getTokenFromLocalStorage } from '../utils/utils';
import { deleteTokenFromServer } from '../api/authApi';
import { Spin } from 'antd';
import { ResetPasswordModal } from './UI/modal/DataInputModal/ResetPasswordModal';
import { ResetPasswordSuccessModal } from './UI/modal/SuccessModal/ResetPasswordSentSuccessModal';
import { LoadingModal } from './UI/modal/LoadingModal';
import { SignUpSuccessModal } from './UI/modal/SuccessModal/SignUpSuccessModal';
import { EmailConfirmedSuccessModal } from './UI/modal/SuccessModal/EmailConfirmedSuccessModal';
import { logoutCurrentUser } from '../store/authSlice';

export const Navigation = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignInModal)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const passwordResetEmail = useAppSelector(state => state.authModal.passwordResetEmail)
    const dispatch = useAppDispatch()
    const [isNavLoading, setNavLoading] = useState(false)
    const [theme, setTheme] = useState('ligth')

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    const changeTheme = () => setTheme(theme === 'ligth' ? 'dark' : 'ligth')

    const signOut = () => {
        new Promise<void>((resolve) => {
            setNavLoading(true)
            resolve()
        })
            .then(() => deleteTokenFromServer(getTokenFromLocalStorage()))
            .catch(error => {
                setNavLoading(false)
                throw error
            })
            .then(() => {
                deleteTokenFromLocalStorage()
                dispatch(logoutCurrentUser())
            })
            .finally(() => setNavLoading(false))
    }

    return (
        <div className='nav__container'>
            <div className="nav">
                <Link to='/'>
                    <div className="nav__title">FindMe</div>
                </Link>
                {isNavLoading
                    ?
                    <div className="nav__items">
                        <Spin />
                    </div>
                    :
                    <div className="nav__items">
                        <div
                            className="nav__item"
                            onClick={() => changeTheme()}
                        >
                            {
                                theme === 'ligth'
                                    ?
                                    <IoMoonOutline />
                                    :
                                    <IoMoon />
                            }
                        </div>
                        {currentUser.username && getTokenFromLocalStorage()
                            ?
                            <>
                                <div className="nav__item">
                                    <div className="">{currentUser.username}</div>
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
                                    onClick={e => dispatch(changeSignInVisibilityModal(!isOpen))}
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
            <SignInModal />
            <SignUpModal />
            <ResetPasswordModal />
            <SignUpSuccessModal />
            <EmailConfirmedSuccessModal />
            <ResetPasswordSuccessModal customEmail={passwordResetEmail} />
            <LoadingModal />
        </div>
    )
}
