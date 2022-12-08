import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAuthToken, postSignUpDetails } from '../../../api/authApi'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSignInVisibility, changeSignUpVisibility } from '../../../store/authModalSlice'
import { addUser } from '../../../store/authSlice'
import { IResponseAuthError } from '../../../types/types'
import { AuthErrors, MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from '../../../utils/constants'
import { AuthInput } from '../input/AuthInput'
import cl from './RegisterModal.module.css'

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
    const userAuthData = {
        username: login.value,
        password: password1.value
    }
    const [responseAuthError, setResponseAuthError] = useState<IResponseAuthError>({})
    const [wasRequest, setWasReqeust] = useState(false)


    useEffect(() => {
        let isDisabled =
            login.isDirty && (login.isEmtpy || login.lengthError)
            ||
            password1.isDirty && (password1.isEmtpy || password1.lengthError)
            ||
            password2.isDirty && (password2.isEmtpy || password2.lengthError)
            ||
            !
            isPasswordsEqual
            ||
            wasRequest

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
        postSignUpDetails(userAuthData)
            .then(response => response.data)
            .catch(error => {
                setWasReqeust(true)
                setResponseAuthError(error.response.data)
                throw error
            })
            .then(() =>
                getAuthToken(userAuthData)
                    .then(response => response.data.authToken)
                    .then(authToken => dispatch(addUser({ ...userAuthData, authToken })))
                    .then(() => {
                        dispatch(changeSignUpVisibility(false))
                        login.setValue('')
                        password1.setValue('')
                        password2.setValue('')
                    })
                    .catch(error => setResponseAuthError(
                        { ...responseAuthError, globalError: 'Something went wrong' }
                    ))
            )
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
                        onClick={() => dispatch(changeSignUpVisibility(false))}
                        className="popup__close"
                    />
                    <div className="popup__title">
                        <div className={cl.popup__loginTitle}>Sign Up</div>
                    </div>
                    <div className="popup__text">
                        <div className={cl.popup__loginContent}>
                            <Button danger type='primary'>With Google</Button>
                            <div className={cl.authGreenLine}></div>
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
                            </div>
                            <div className={cl.auth__password}>
                                <AuthInput
                                    value={password1.value}
                                    onChange={e => {
                                        password1.onChange(e)
                                        setWasReqeust(false)
                                    }}
                                    onBlur={() => password1.onBlur()}
                                    type={isPassword1Visible ? 'text' : 'password'}
                                    placeholder='Your password...'
                                    required={true}
                                />
                                <div
                                    className={isPassword1Visible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler1()}
                                >
                                </div>
                            </div>
                            <div className={cl.login__title}>Repeat password</div>
                            <div className={cl.authFieldErrorContainer}>
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
                            </div>
                            <div className={cl.auth__password}>
                                <AuthInput
                                    value={password2.value}
                                    onChange={e => {
                                        password2.onChange(e)
                                        setWasReqeust(false)
                                    }}
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
                            <div className={cl.authFieldGlobalErrorContainer}>
                                {!isPasswordsEqual && password1.isDirty && password2.isDirty
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.passwordsNotEqual}</div>
                                    :
                                    <></>
                                }
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
                            </div>
                            <Button
                                // onClick={e => formSubmitHandler(e)}
                                type='primary'
                                htmlType={'submit'}
                                disabled={isBtnDisabled}>

                                Sign In
                            </Button>
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


