import React, { useEffect, useState } from 'react'
import { IoClose, IoLogoGoogle } from 'react-icons/io5'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSignInVisibility, changeSignUpVisibility } from '../../../store/authModalSlice'
import { AuthErrors, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { AuthInput } from '../input/AuthInput'
import cl from './LoginModal.module.css'

export const LoginModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignIn)
    const dispatch = useAppDispatch()

    const loginValidationProps = {
        isEmpty: true,
        minLength: MIN_LOGIN_LENGTH,
        maxLength: MAX_LOGIN_LENGTH
    }
    const passwordValidationProps = {
        isEmpty: true,
        minLength: MIN_PASSWORD_LENGTH,
        maxLength: MAX_PASSWORD_LENGTH
    }

    const login = useInput('', loginValidationProps)
    const password = useInput('', passwordValidationProps)
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)


    useEffect(() => {
        const isDisabled =
            login.isDirty && (login.isEmtpy || login.lengthError)
            ||
            password.isDirty && (password.isEmtpy || password.lengthError)

        setBtnDisabled(isDisabled)

    }, [login, password])


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
    }

    const changeVisibilityHandler = () => {
        setPasswordVisible(!isPasswordVisible)
    }

    const openSignUpForm = () => {
        dispatch(changeSignInVisibility(false))
        dispatch(changeSignUpVisibility(true))
    }

    const closeModalBtnHandler = () => {
        dispatch(changeSignInVisibility(false))
    }

    const resetPasswordHandler = () => {

    }


    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className="popup__body"
            >
                <form
                    className={isOpen ? 'popup__content popup__contentActive' : 'popup__content'}
                    onSubmit={(event) => formSubmitHandler(event)}
                >
                    <button
                        onClick={() => closeModalBtnHandler()}
                        className="popup__close"
                    />
                    <div className="popup__title">
                        <div className={cl.popup__loginTitle}>Sign In</div>
                    </div>
                    <div className="popup__text">
                        <div className={cl.popup__loginContent}>
                            <AnitmatedBtn color='red'>
                                <span>With Google</span>
                            </AnitmatedBtn>
                            <div className={cl.authGreenLine}></div>
                            <div className={cl.login__title}>Login</div>
                            <div className={cl.authFieldErrorContainer}>
                                {login.isDirty && login.isEmtpy
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.emptyLogin}</div>
                                    :
                                    <></>
                                }
                                {login.isDirty && !login.isEmtpy && login.lengthError && login.value.length !== 0
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.invalidLogin}</div>
                                    :
                                    <></>
                                }
                            </div>
                            <AuthInput
                                onChange={e => login.onChange(e)}
                                onBlur={() => login.onBlur()}
                                placeholder='Your login...'
                            />
                            <div className={cl.login__title}>Password</div>
                            <div className={cl.authFieldErrorContainer}>
                                {password.isDirty && password.isEmtpy
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.emptyPassword}</div>
                                    :
                                    <></>
                                }
                                {password.isDirty && !password.isEmtpy && password.lengthError
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.invalidPassword}</div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className={cl.auth__password}>
                                <AuthInput
                                    onChange={e => password.onChange(e)}
                                    onBlur={() => password.onBlur()}
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                />
                                <div
                                    className={isPasswordVisible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler()}
                                >
                                </div>
                            </div>
                            <AnitmatedBtn disabled={isBtnDisabled} >Sign In</AnitmatedBtn>
                            <div className="authSignUpText">
                                <div className={cl.authSignUpText}>
                                    No account?
                                    <div
                                        className={cl.authSignUpLink}
                                        onClick={() => openSignUpForm()}
                                    >
                                        Sign Up
                                    </div>
                                </div>
                            </div>
                            <div className="authSignUpText">
                                <div className={cl.authSignUpText}>
                                    Forgot your password?
                                    <div
                                        className={cl.authSignUpLink}
                                        onClick={() => resetPasswordHandler()}
                                    >
                                        Reset
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
