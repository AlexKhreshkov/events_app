import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSignInVisibility } from '../../../store/authModalSlice'
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants'
import { checkLogin, checkPassword } from '../../../utils/utils'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { AuthInput } from '../input/AuthInput'
import cl from './LoginModal.module.css'

export const LoginModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignIn)
    const dispatch = useAppDispatch()

    const login = useInput('')
    const password = useInput('')
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

    const [formErrors, setFormErrors] = useState({
        loginError: '',
        passwordError: '',
    })


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!checkLogin(login.value)) {
            setFormErrors(prev => ({
                ...prev,
                loginError: `Login must be from ${MIN_LOGIN_LENGTH} to ${MAX_LOGIN_LENGTH} symbols`
            }))
        } else {
            setFormErrors(prev => ({
                ...prev,
                loginError: ''
            }))
        }
        if (!checkPassword(password.value)) {
            setFormErrors(prev => ({
                ...prev,
                passwordError: `Password must be from ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} symbols`
            }))
            console.log(password.value);
        } else {
            setFormErrors(prev => ({
                ...prev,
                passwordError: ''
            }))
        }
        if (checkLogin(login.value) && checkPassword(password.value)) {
            console.log('done');
        }
    }

    const changeVisibilityHandler = () => {
        setPasswordVisible(!isPasswordVisible)
    }


    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className="popup__body"
            >
                <form
                    className="popup__content"
                    onSubmit={(event) => formSubmitHandler(event)}
                >
                    <div
                        onClick={() => dispatch(changeSignInVisibility(false))}
                        className="popup__close"
                    >
                        <IoClose />
                    </div>
                    <div className="popup__title">
                        <div className={cl.popup__loginTitle}>Sign In</div>
                    </div>
                    <div className="popup__text">
                        <div className={cl.popup__loginContent}>
                            <AnitmatedBtn color='red'>Google</AnitmatedBtn>
                            <div className={cl.authOrText}>OR</div>
                            <div className={cl.login__title}>
                                Login
                            </div>
                            <div className={cl.authFieldError}>{formErrors.loginError}</div>
                            <AuthInput onChange={login.onChange} placeholder='Your login...' />
                            <div className={cl.login__title}>Password</div>
                            <div className={cl.authFieldError}>{formErrors.passwordError}</div>
                            <div className={cl.auth__password}>
                                <AuthInput
                                    onChange={password.onChange}
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                />
                                <div
                                    className={isPasswordVisible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler()}
                                >
                                </div>
                            </div>
                            <AnitmatedBtn>Sign In</AnitmatedBtn>
                            <div className={cl.authOrText}>OR</div>
                            <div className="authSignUpText">
                                <div className={cl.authSignUpText}>
                                    No account?
                                    <Link to=''>
                                        <div className={cl.authSignUpLink}>Sign Up</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
