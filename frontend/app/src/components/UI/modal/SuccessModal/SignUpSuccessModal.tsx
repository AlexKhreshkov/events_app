import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changeSignUpSuccessModalVisibility } from '../../../../store/authModalSlice'
import cl from './EmailConfirmedSuccessModal.module.css'

export const SignUpSuccessModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignUpSuccessModal)
    const email = useAppSelector(state => state.authModal.passwordResetEmail)
    const dispatch = useAppDispatch()

    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className="popup__body"
            >
                <form
                    className={isOpen ? 'popup__content popup__contentActive' : 'popup__content'}
                >
                    <button
                        type='button'
                        onClick={() => dispatch(changeSignUpSuccessModalVisibility(false))}
                        className="popup__close"
                    />
                    <div className={cl.success__content}>
                        <div className={cl.success__title}>Success!</div>
                        <div className={cl.success__body}>
                            <div className={cl.success__text}>
                                <div className="">
                                    Account activation link has been sent on your email:
                                </div>
                                <div className={cl.success__email}>
                                    {email}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


