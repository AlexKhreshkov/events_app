import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSignInVisibility, changeSignUpVisibility } from '../../../store/authModalSlice'
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants'
import { checkLogin, checkPassword } from '../../../utils/utils'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { AuthInput } from '../input/AuthInput'
import cl from './LoginModal.module.css'

export const RegisterModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignUp)
    const dispatch = useAppDispatch()

    const login = useInput('')
    const password1 = useInput('')
    const password2 = useInput('')
    const [isPassword1Visible, setPassword1Visible] = useState<boolean>(false)
    const [isPassword2Visible, setPassword2Visible] = useState<boolean>(false)

    const [formErrors, setFormErrors] = useState({
        loginError: '',
        password1Error: '',
        password2Error: '',
        passwordEqualError: ''
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
        if (!checkPassword(password1.value)) {
            setFormErrors(prev => ({
                ...prev,
                password1Error: `Password must be from ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} symbols`
            }))
        } else {
            setFormErrors(prev => ({
                ...prev,
                password1Error: ''
            }))
        }
        if (!checkPassword(password2.value)) {
            setFormErrors(prev => ({
                ...prev,
                password2Error: `Password must be from ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} symbols`
            }))
        } else {
            setFormErrors(prev => ({
                ...prev,
                password2Error: ''
            }))
        }
        if (password1.value !== password2.value) {
            setFormErrors(prev => ({
                ...prev,
                passwordEqualError: `Passwords don't match`
            }))
        }
        if (checkLogin(login.value)
            && checkPassword(password1.value)
            && checkPassword(password2.value)
            && (password1.value === password2.value)) {

            setFormErrors(prev => ({
                loginError: '',
                password1Error: '',
                password2Error: '',
                passwordEqualError: '',
            }))
            login.setValue('')
            password1.setValue('')
            password2.setValue('')
            console.log('done');
        }
    }

    const changeVisibilityHandler1 = () => {
        setPassword1Visible(!isPassword1Visible)
    }
    const changeVisibilityHandler2 = () => {
        setPassword2Visible(!isPassword2Visible)
    }

    const openSignUpForm = () => {
        dispatch(changeSignInVisibility(true))
        dispatch(changeSignUpVisibility(false))
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
                        onClick={() => dispatch(changeSignUpVisibility(false))}
                        className="popup__close"
                    >
                        <IoClose />
                    </div>
                    <div className="popup__title">
                        <div className={cl.popup__loginTitle}>Sign Up</div>
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
                            <div className={cl.authFieldError}>{formErrors.password1Error}</div>
                            <div className={cl.auth__password}>
                                <AuthInput
                                    onChange={password1.onChange}
                                    type={isPassword1Visible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                />
                                <div
                                    className={isPassword1Visible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler1()}
                                >
                                </div>
                            </div>
                            <div className={cl.login__title}>Reapeat Password</div>
                            <div className={cl.authFieldError}>{formErrors.password2Error}</div>
                            <div className={cl.auth__password}>
                                <AuthInput
                                    onChange={password2.onChange}
                                    type={isPassword2Visible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                />
                                <div
                                    className={isPassword2Visible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler2()}
                                >
                                </div>
                            </div>
                            <div className={cl.authFieldError}>{formErrors.passwordEqualError}</div>
                            <AnitmatedBtn>Sign Un</AnitmatedBtn>
                            <div className="authSignUpText">
                                <div
                                    className={cl.authSignUpText}>
                                    Have an account?
                                    <div
                                        className={cl.authSignUpLink}
                                        onClick={() => openSignUpForm()}
                                    >
                                        Sign In
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
