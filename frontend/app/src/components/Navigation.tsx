import { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoPersonOutline, IoHeartOutline, IoExitOutline } from "react-icons/io5";
import { SignInModal } from './UI/modal/DataInputModal/SignInModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { changeLoaderFullSizeVisibility, changeSignInVisibilityModal } from '../store/authModalSlice';
import { SignUpModal } from './UI/modal/DataInputModal/SignUpModal';
import { deleteTokenFromUser } from '../store/authSlice';
import { deleteTokenFromLocalStorage } from '../utils/utils';
import { deleteTokenFromServer } from '../api/authApi';
import { Spin } from 'antd';
import { ResetPasswordModal } from './UI/modal/DataInputModal/ResetPasswordModal';
import { ResetPasswordSuccessModal } from './UI/modal/SuccessModal/ResetPasswordSentSuccessModal';
import { LoadingModal } from './UI/modal/LoadingModal';
import { SignUpSuccessModal } from './UI/modal/SuccessModal/SignUpSuccessModal';
import { EmailConfirmedSuccessModal } from './UI/modal/SuccessModal/EmailConfirmedSuccessModal';

export const Navigation = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignInModal)
    const user = useAppSelector(state => state.user.user)
    const passwordResetEmail = useAppSelector(state => state.authModal.passwordResetEmail)
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
            <SignUpSuccessModal/>
            <EmailConfirmedSuccessModal/>
            <ResetPasswordSuccessModal customEmail={passwordResetEmail} />
            <LoadingModal />
        </div>
    )
}
