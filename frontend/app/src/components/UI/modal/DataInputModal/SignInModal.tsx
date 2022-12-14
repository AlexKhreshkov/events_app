import cl from './SignInModal.module.css'

import { AuthErrors, loginValidationProps, passwordValidationProps } from '../../../../utils/constants'
import { changeResetPasswordVisibilityModal, changeSignInVisibilityModal, changeSignUpVisibilityModal } from '../../../../store/authModalSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { IResponseAuthError } from '../../../../types/types'
import { useInput } from '../../../../hooks/useInput'
import { getAuthToken } from '../../../../api/authApi'
import { addToken, defineCurrentUser } from '../../../../store/authSlice'
import { AuthInput } from '../../input/AuthInput'
import { Loader } from '../../../Loader'

import { Button } from 'antd'
import React, { useEffect, useState } from 'react'


export const SignInModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignInModal)
    const [isLoading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const login = useInput('', loginValidationProps)
    const password = useInput('', passwordValidationProps)
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)
    const [responseAuthError, setResponseAuthError] = useState<IResponseAuthError>({})
    const [wasRequest, setWasReqeust] = useState(false)


    useEffect(() => {
        const isDisabled =
            login.isDirty && (login.isEmtpy || login.lengthError)
            ||
            password.isDirty && (password.isEmtpy || password.lengthError)
            ||
            wasRequest
        setBtnDisabled(isDisabled)
    }, [login, password])

    const userAuthData = {
        username: login.value,
        password: password.value,
    }

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimedData = {
            username: userAuthData.username.trim(),
            password: userAuthData.password.trim(),
        }
        getAuthToken(trimedData)
            .then(response => {
                const authToken = response.data.auth_token
                dispatch(addToken(authToken))
                localStorage.setItem('authToken', authToken)
                dispatch(defineCurrentUser())
            })
            .then(() => {
                dispatch(changeSignInVisibilityModal(false))
                login.setValue('')
                password.setValue('')
                login.setDirty(false)
                password.setDirty(false)
            })
            .catch(error => {
                setWasReqeust(true)
                setResponseAuthError(error.response.data)
            })
            .finally(() => setLoading(false))
    }

    const changeVisibilityHandler = () => {
        setPasswordVisible(!isPasswordVisible)
    }

    const openSignUpForm = () => {
        dispatch(changeSignInVisibilityModal(false))
        dispatch(changeSignUpVisibilityModal(true))
    }

    const openResetPasswordForm = () => {
        dispatch(changeSignInVisibilityModal(false))
        dispatch(changeResetPasswordVisibilityModal(true))
    }

    const onClose = () => dispatch(changeSignInVisibilityModal(false))

    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            {isLoading ? <Loader /> : <></>}
            <div
                className='popup__body'
                onClick={onClose}
            >
                <form
                    className={isOpen ? 'popup__content popup__contentActive' : 'popup__content'}
                    onSubmit={(event) => formSubmitHandler(event)}
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        type='button'
                        onClick={() => dispatch(changeSignInVisibilityModal(false))}
                        className='popup__close'
                    />
                    <div className='popup__title'>
                        <div className={cl.popup__loginTitle}>Sign In</div>
                    </div>
                    <div className='popup__text'>
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
                            <div className='authSignUpText'>
                                <div className={cl.authSignInText}>
                                    Don't have an account?
                                    <div
                                        className={cl.authSignInLink}
                                        onClick={() => openSignUpForm()}
                                    >
                                        Sign Up
                                    </div>
                                </div>
                            </div>
                            <div className='authSignUpText'>
                                <div className={cl.authSignInText}>
                                    Forgot your password?
                                    <div
                                        className={cl.authSignInLink}
                                        onClick={() => openResetPasswordForm()}
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
