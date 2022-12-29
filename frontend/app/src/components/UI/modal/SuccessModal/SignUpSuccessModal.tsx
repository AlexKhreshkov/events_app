import cl from './EmailConfirmedSuccessModal.module.css'

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changeSignUpSuccessModalVisibility } from '../../../../store/authModalSlice'

export const SignUpSuccessModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignUpSuccessModal)
    const email = useAppSelector(state => state.authModal.passwordResetEmail)
    const dispatch = useAppDispatch()
    const onClose = () => dispatch(changeSignUpSuccessModalVisibility(false))

    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className='popup__body'
                onClick={onClose}
            >
                <form
                    className={isOpen ? 'popup__content popup__contentActive' : 'popup__content'}
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        type='button'
                        onClick={() => dispatch(changeSignUpSuccessModalVisibility(false))}
                        className='popup__close'
                    />
                    <div className={cl.success__content}>
                        <div className={cl.success__title}>Success!</div>
                        <div className={cl.success__body}>
                            <div className={cl.success__text}>
                                <div className=''>
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


