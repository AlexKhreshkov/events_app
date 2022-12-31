import { SignInModal } from './UI/modal/DataInputModal/SignInModal';
import { SignUpModal } from './UI/modal/DataInputModal/SignUpModal';
import { ResetPasswordModal } from './UI/modal/DataInputModal/ResetPasswordModal';
import { ResetPasswordSuccessModal } from './UI/modal/SuccessModal/ResetPasswordSentSuccessModal';
import { LoadingModal } from './UI/modal/LoadingModal';
import { SignUpSuccessModal } from './UI/modal/SuccessModal/SignUpSuccessModal';
import { EmailConfirmedSuccessModal } from './UI/modal/SuccessModal/EmailConfirmedSuccessModal';
import { FavouritesAds } from './UI/modal/FavouritesAds';

import { logoutCurrentUser } from '../store/authSlice';
import { changeFavouritesAdsOpen, changeSignInVisibilityModal } from '../store/authModalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';

import { ROUTES_PATH } from '../utils/constants';

import { IoExitOutline, IoHeartOutline, IoMoon, IoMoonOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { Loader } from './Loader';

export const Navigation = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [theme, setTheme] = useState('ligth')
    const [isToggle, setToggle] = useState(false)
    const isOpen = useAppSelector(state => state.authModal.isSignInModal)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const authToken = useAppSelector(state => state.user.authToken)
    const passwordResetEmail = useAppSelector(state => state.authModal.passwordResetEmail)
    const favouritesAds = useAppSelector(state => state.favouritesAds.favouritesAds)
    const [isNavLoading, setNavLoading] = useState(false)

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        if (!favouritesAds.length) {
            dispatch(changeFavouritesAdsOpen(false))
        }
    }, [favouritesAds])

    const signOut = () => {
        async function logout() {
            setNavLoading(true)
            await dispatch(logoutCurrentUser())
            setNavLoading(false)
        }
        logout()
    }

    const changeTheme = () => setTheme(theme === 'ligth' ? 'dark' : 'ligth')
    const handleLike = () => dispatch(changeFavouritesAdsOpen(true))
    const handlerAuthModal = () => dispatch(changeSignInVisibilityModal(!isOpen))
    const goToProfile = () => navigate(`${ROUTES_PATH.Profile}`)
    const handleToggle = () => setToggle(!isToggle)

    return (
        <>
            <div className='nav__container'>
                {isNavLoading && <Loader />}
                <nav className='nav'>
                    <Link to={ROUTES_PATH.Main}>
                        <div className='nav__title'>FindMe</div>
                    </Link>
                    <div className='toggleBtn' onClick={handleToggle}>
                        <span className='bar'></span>
                        <span className='bar'></span>
                        <span className='bar'></span>
                    </div>
                    <ul className={isToggle ? 'nav__items toggleActive' : 'nav__items'}>
                        <li
                            onClick={() => changeTheme()}
                        >
                            {
                                theme === 'ligth'
                                    ?
                                    <IoMoonOutline />
                                    :
                                    <IoMoon />
                            }
                        </li>
                        <li
                            onClick={handleLike}
                            className='nav__item liked'
                        >
                            <IoHeartOutline />
                            <div
                                className='liked_count'
                            >
                                {favouritesAds?.length ? favouritesAds?.length : <></>}
                            </div>
                        </li>
                        {currentUser.username && authToken
                            ?
                            <>
                                <li>
                                    <IoPersonOutline onClick={() => goToProfile()} />
                                    <span id='navUsername'>{currentUser.username}</span>
                                </li>
                                <li onClick={() => signOut()}>
                                    <IoExitOutline />
                                </li>
                            </>
                            :
                            <li onClick={handlerAuthModal}>
                                <IoPersonOutline />
                            </li>
                        }
                    </ul>
                </nav>
                <SignInModal />
                <SignUpModal />
                <ResetPasswordModal />
                <SignUpSuccessModal />
                <EmailConfirmedSuccessModal />
                <ResetPasswordSuccessModal customEmail={passwordResetEmail} />
                <LoadingModal />
                <FavouritesAds />
            </div>
        </>
    )
}
