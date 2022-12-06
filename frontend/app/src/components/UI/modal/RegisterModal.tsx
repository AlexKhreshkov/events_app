import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSignInVisibility, changeSignUpVisibility } from '../../../store/authModalSlice'
import { checkPassword } from '../../../utils/auth_utils'
import { AuthErrors, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { AuthInput } from '../input/AuthInput'
import cl from './LoginModal.module.css'

export const RegisterModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignUp)
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
    const password1 = useInput('', passwordValidationProps)
    const password2 = useInput('', passwordValidationProps)
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)
    const [isPassword1Visible, setPassword1Visible] = useState<boolean>(false)
    const [isPassword2Visible, setPassword2Visible] = useState<boolean>(false)
    const [isPasswordsEqual, setPasswordsEqual] = useState<boolean>(false)

    useEffect(() => {
        const isDisabled =
            login.isDirty && (login.isEmtpy || login.lengthError)
            ||
            password1.isDirty && (password1.isEmtpy || password1.lengthError)
            ||
            password2.isDirty && (password2.isEmtpy || password2.lengthError)
            ||
            !isPasswordsEqual

        setBtnDisabled(isDisabled)
        setPasswordsEqual(password1.value === password2.value)

    }, [login, password1, password2])


    const changeVisibilityHandler1 = () => {
        setPassword1Visible(!isPassword1Visible)
    }
    const changeVisibilityHandler2 = () => {
        setPassword2Visible(!isPassword2Visible)
    }

    const openSignInForm = () => {
        dispatch(changeSignInVisibility(true))
        dispatch(changeSignUpVisibility(false))
    }

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //do smth
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
                            <div className={cl.login__title}>Login</div>
                            {login.isDirty && login.isEmtpy
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.emptyLogin}</div>
                                :
                                <></>
                            }
                            {login.isDirty && !login.isEmtpy && login.lengthError
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.invalidLogin}</div>
                                :
                                <></>
                            }
                            <AuthInput
                                onChange={e => login.onChange(e)}
                                onBlur={() => login.onBlur()}
                                placeholder='Your login...'
                            />
                            <div className={cl.login__title}>Password</div>
                            {password1.isDirty && password1.isEmtpy
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.emptyPassword}</div>
                                :
                                <></>
                            }
                            {password1.isDirty && !password1.isEmtpy && password1.lengthError
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.invalidPassword}</div>
                                :
                                <></>
                            }
                            <div className={cl.auth__password}>
                                <AuthInput
                                    onChange={e => password1.onChange(e)}
                                    onBlur={() => password1.onBlur()}
                                    type={isPassword1Visible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                />
                                <div
                                    className={isPassword1Visible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler1()}
                                >
                                </div>
                            </div>
                            <div className={cl.login__title}>Repeat password</div>
                            {password2.isDirty && password2.isEmtpy
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.emptyPassword}</div>
                                :
                                <></>
                            }
                            {password2.isDirty && !password2.isEmtpy && password2.lengthError
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.invalidPassword}</div>
                                :
                                <></>
                            }
                            <div className={cl.auth__password}>
                                <AuthInput
                                    onChange={e => password2.onChange(e)}
                                    onBlur={() => password2.onBlur()}
                                    type={isPassword2Visible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                />
                                <div
                                    className={isPassword2Visible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler2()}
                                >
                                </div>
                            </div>
                            {!isPasswordsEqual && password1.isDirty && password2.isDirty
                                ?
                                <div className={cl.authFieldError}>{AuthErrors.passwordsNotEqual}</div>
                                :
                                <></>
                            }
                            <AnitmatedBtn disabled={isBtnDisabled} >Sign In</AnitmatedBtn>
                            <div className="authSignUpText">
                                <div className={cl.authSignUpText}>
                                    Have an account?
                                    <div
                                        className={cl.authSignUpLink}
                                        onClick={() => openSignInForm()}
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


