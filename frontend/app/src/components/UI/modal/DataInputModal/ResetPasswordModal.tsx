import cl from './ResetPasswordModal.module.css'

import { useInput } from '../../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changeLoaderFullSizeVisibility, changePasswordResetEmail, changePasswordResetSuccsessModalVisibility, changeResetPasswordVisibilityModal } from '../../../../store/authModalSlice'
import { AuthErrors, emailValidationProps } from '../../../../utils/constants'
import { AuthInput } from '../../input/AuthInput'
import { resetPassword } from '../../../../api/authApi'

import { Loader } from '../../../Loader'

import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

//RESET PASSWORD FORM WITH EMAIL INPUT
export const ResetPasswordModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isResetPasswordModal)
    const dispatch = useAppDispatch()

    const email = useInput('', emailValidationProps)
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)
    const [responseAuthError, setResponseAuthError] = useState('')
    const [wasRequest, setWasReqeust] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const isDisabled =
            email.isDirty && email.isEmtpy
            ||
            wasRequest

        setBtnDisabled(isDisabled)

    }, [email])


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        resetPassword(email.value)
            .catch(error => setResponseAuthError(error.response.data))
            .then(() => {
                dispatch(changePasswordResetEmail(email.value))
                dispatch(changePasswordResetSuccsessModalVisibility(true))
            })
            .then(() => dispatch(changeResetPasswordVisibilityModal(false)))
            .finally(() => setLoading(false))
    }

    const onClose = () => dispatch(changeResetPasswordVisibilityModal(false))

    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            {isLoading && <Loader />}
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
                        onClick={() => dispatch(changeResetPasswordVisibilityModal(false))}
                        className='popup__close'
                    />
                    <div className='popup__title'>
                        <div className={cl.popup__loginTitle}>Reset password</div>
                    </div>
                    <div className='popup__text'>
                        <div className={cl.popup__loginContent}>
                            <Button danger type='primary'>Login with google</Button>
                            <div className='blackLine'></div>
                            <div className='authSignUpText'>
                                <div className={cl.authEmailText}>
                                    To reset your password enter your email.
                                </div>
                            </div>
                            <div className={cl.login__title}>Email</div>
                            <div className={cl.authFieldErrorContainer}>
                                {email.isDirty && email.isEmtpy
                                    ?
                                    <div className={cl.authFieldError}>{AuthErrors.emptyEmail}</div>
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
                                placeholder='Your email...'
                                required={true}
                                type='email'
                            />
                            {responseAuthError
                                ?
                                <div className={cl.authFieldGlobalErrorContainer}>
                                    {AuthErrors.accountNotActivated}
                                </div>
                                :
                                <div className={cl.authFieldGlobalErrorContainer}>
                                </div>
                            }
                            <Button
                                type='primary'
                                htmlType={'submit'}
                                disabled={isBtnDisabled}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}