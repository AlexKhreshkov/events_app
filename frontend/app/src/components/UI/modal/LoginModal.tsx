import React, { useEffect, useState } from 'react'
import { IoClose, IoLogoGoogle } from 'react-icons/io5'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSignInVisibility, changeSignUpVisibility } from '../../../store/authModalSlice'
import { AuthErrors, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { AuthInput } from '../input/AuthInput'
import cl from './LoginModal.module.css'
import { Button } from 'antd'
import { getAuthToken, postSignUpDetails, signIn } from '../../../api/authApi'
import { IResponseAuthError } from '../../../types/types'
import { addUser } from '../../../store/authSlice'




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
    const [responseAuthError, setResponseAuthError] = useState<IResponseAuthError>({})
    const [wasRequest, setWasReqeust] = useState(false)

    const userAuthData = {
        username: login.value,
        password: password.value
    }


    useEffect(() => {
        const isDisabled =
            login.isDirty && (login.isEmtpy || login.lengthError)
            ||
            password.isDirty && (password.isEmtpy || password.lengthError)
            ||
            wasRequest

        setBtnDisabled(isDisabled)

    }, [login, password])


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signIn(userAuthData)
            .then(response => response.data)
            .catch(error => {
                setWasReqeust(true)
                setResponseAuthError(error.response.data)
                console.log(error.response.data)
                throw error
            })
            .then(() =>
                getAuthToken(userAuthData)
                    .then(response => {
                        const authToken = response.data.auth_token
                        dispatch(addUser({
                            username: userAuthData.username.trim(),
                            authToken
                        }))
                        localStorage.setItem('authToken', authToken)
                    })
                    .then(() => {
                        dispatch(changeSignInVisibility(false))
                        login.setValue('')
                        password.setValue('')
                    })
                    .catch(error => setResponseAuthError(
                        { ...responseAuthError, globalError: 'Something went wrong' }
                    ))
            )
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
                        type='button'
                        onClick={() => dispatch(changeSignInVisibility(false))}
                        className="popup__close"
                    />
                    <div className="popup__title">
                        <div className={cl.popup__loginTitle}>Sign Up</div>
                    </div>
                    <div className="popup__text">
                        <div className={cl.popup__loginContent}>
                            <Button danger type='primary'>With Google</Button>
                            <div className='blackLine'></div>
                            <div className={cl.login__title}>Login</div>
                            <div className={cl.authFieldErrorContainer}>
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
                            </div>
                            <AuthInput
                                value={login.value}
                                onChange={e => {
                                    login.onChange(e)
                                    setWasReqeust(false)
                                }}
                                onBlur={() => login.onBlur()}
                                placeholder='Your login...'
                                required={true}
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
                                    value={password.value}
                                    onChange={e => {
                                        password.onChange(e)
                                        setWasReqeust(false)
                                    }}
                                    onBlur={() => password.onBlur()}
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                    required={true}
                                />
                                <div
                                    className={isPasswordVisible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler()}
                                >
                                </div>
                            </div>

                            <div className={cl.authFieldGlobalErrorContainer}>
                                {responseAuthError.password
                                    ?
                                    <div className={cl.authFieldError}>
                                        {responseAuthError.password}
                                    </div>
                                    :
                                    <></>
                                }
                                {responseAuthError.username
                                    ?
                                    <div className={cl.authFieldError}>
                                        {responseAuthError.username}
                                    </div>
                                    :
                                    <></>
                                }
                                {responseAuthError.globalError
                                    ?
                                    <div className={cl.authFieldError}>
                                        {responseAuthError.globalError}
                                    </div>
                                    :
                                    <></>
                                }
                                {responseAuthError.non_field_errors
                                    ?
                                    <div className={cl.authFieldError}>
                                        {responseAuthError.non_field_errors}
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <Button
                                type='primary'
                                htmlType={'submit'}
                                disabled={isBtnDisabled}
                            >
                                Sign In
                            </Button>
                            <div className="authSignUpText">
                                <div className={cl.authSignUpText}>
                                    Haven't registered?
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
                                        onClick={() => openSignUpForm()}
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
