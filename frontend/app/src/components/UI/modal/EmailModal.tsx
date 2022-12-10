import React, { useEffect, useState } from 'react'
import { useInput } from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeResetPasswordVisibility, changeSignInVisibility, changeSignUpVisibility } from '../../../store/authModalSlice'
import { AuthErrors } from '../../../utils/constants'
import { AuthInput } from '../input/AuthInput'
import cl from './EmailModal.module.css'
import { Button } from 'antd'
import { IResponseAuthError } from '../../../types/types'


export const EmailModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isChangePassword)
    const dispatch = useAppDispatch()

    const email = useInput()
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)
    const [responseAuthError, setResponseAuthError] = useState<IResponseAuthError>({})
    const [wasRequest, setWasReqeust] = useState(false)

    const userAuthData = {
        email: email.value
    }


    useEffect(() => {
        const isDisabled =
            email.isDirty || email.isEmtpy
            ||
            wasRequest

        setBtnDisabled(isDisabled)

    }, [email])


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

    }

    const openSignUpForm = () => {
        dispatch(changeSignInVisibility(false))
        dispatch(changeSignUpVisibility(true))
    }

    const openResetPasswordForm = () => {
        dispatch(changeSignInVisibility(false))
        dispatch(changeSignUpVisibility(false))
    }

    const closeModalBtnHandler = () => {
        dispatch(changeSignInVisibility(false))
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
                        onClick={() => dispatch(changeResetPasswordVisibility(false))}
                        className="popup__close"
                    />
                    <div className="popup__title">
                        <div className={cl.popup__loginTitle}>Reset password</div>
                    </div>
                    <div className="popup__text">
                        <div className={cl.popup__loginContent}>
                            <Button danger type='primary'>Login with google</Button>
                            <div className='blackLine'></div>
                            <div className="authSignUpText">
                                <div className={cl.authEmailText}>
                                    To reset your password enter your email.
                                </div>
                            </div>
                            <div className={cl.login__title}>Email</div>
                            <div className={cl.authFieldErrorContainer}>
                                {email.isDirty && email.isEmtpy
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.emptyLogin}</div>
                                    :
                                    <></>
                                }
                                {email.isDirty && !email.isEmtpy && email.lengthError
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.invalidLogin}</div>
                                    :
                                    <></>
                                }
                            </div>
                            <AuthInput
                                value={email.value}
                                onChange={e => {
                                    email.onChange(e)
                                    setWasReqeust(false)
                                }}
                                onBlur={() => email.onBlur()}
                                placeholder='Your login...'
                                required={true}
                            />

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

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}