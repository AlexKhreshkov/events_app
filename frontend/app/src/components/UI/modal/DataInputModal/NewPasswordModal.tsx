import cl from './NewPasswordModal.module.css'

import { useInput } from '../../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changeNewPasswordVisibilityModal, changeSignInVisibilityModal, changeSuccsessModalVisibility } from '../../../../store/authModalSlice'
import { AuthErrors, passwordValidationProps, ROUTES_PATH } from '../../../../utils/constants'
import { AuthInput } from '../../input/AuthInput'
import { IResponseAuthError } from '../../../../types/types'
import { resetPasswordConfirmation } from '../../../../api/authApi'

import { Button } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface NewPasswordModalProps {
    uid?: string,
    token?: string,
}

export const NewPasswordModal: FC<NewPasswordModalProps> = ({ uid, token }) => {

    const isOpen = useAppSelector(state => state.authModal.isNewPasswordModal)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const password1 = useInput('', passwordValidationProps)
    const password2 = useInput('', passwordValidationProps)
    const [isPassword1Visible, setPassword1Visible] = useState<boolean>(false)
    const [isPassword2Visible, setPassword2Visible] = useState<boolean>(false)
    const [isBtnDisabled, setBtnDisabled] = useState<boolean>(false)
    const [responseAuthError, setResponseAuthError] = useState<IResponseAuthError>({})
    const [wasRequest, setWasReqeust] = useState(false)

    useEffect(() => {
        const isDisabled =
            password1.isDirty && (password1.isEmtpy || password1.lengthError)
            ||
            password2.isDirty && (password2.isEmtpy || password2.lengthError)
            ||
            password1.value !== password2.value
            ||
            wasRequest

        setBtnDisabled(isDisabled)

    }, [password1, password2])


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = {
            new_password: password1.value,
            re_new_password: password2.value,
            uid,
            token,
        }
        resetPasswordConfirmation(data)
            .catch((error) => setResponseAuthError(error))
            .then(() => navigate(`${ROUTES_PATH.Main}`))
            .then(() => setTimeout(() => dispatch(changeSuccsessModalVisibility(true)), 1000))
    }

    const changeVisibilityHandler1 = () => {
        setPassword1Visible(!isPassword1Visible)
    }
    const changeVisibilityHandler2 = () => {
        setPassword2Visible(!isPassword2Visible)
    }

    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className='popup__body'
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
                        <div className={cl.popup__loginTitle}>Reset password</div>
                    </div>
                    <div className='popup__text'>
                        <div className={cl.popup__loginContent}>
                            <Button danger type='primary'>With Google</Button>
                            <div className='blackLine'></div>
                            <div className={cl.login__title}>New password</div>
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
                            <div className={cl.login__title}>Repaet new password</div>
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
                                    required={true}
                                />
                                <div
                                    className={isPassword2Visible ? cl.auth__passwordNotVisible : cl.auth__passwordVisble}
                                    onClick={() => changeVisibilityHandler2()}
                                >
                                </div>
                            </div>
                            <div className={cl.authFieldGlobalErrorContainer}>
                                {password1.value !== password2.value && password1.isDirty && password2.isDirty
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
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
