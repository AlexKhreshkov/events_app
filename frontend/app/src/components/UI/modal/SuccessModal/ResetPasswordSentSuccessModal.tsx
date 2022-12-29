import cl from './ResetPasswordSentSuccessModal.module.css'

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changePasswordResetSuccsessModalVisibility } from '../../../../store/authModalSlice'

interface ResetPasswordSuccessModalModalProps {
    customEmail?: string
}

export const ResetPasswordSuccessModal = ({ customEmail }: ResetPasswordSuccessModalModalProps) => {

    const isOpen = useAppSelector(state => state.authModal.isPasswordResetSuccessModal)
    const dispatch = useAppDispatch()
    const onClose = () => dispatch(changePasswordResetSuccsessModalVisibility(false))

    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className='popup__body'
                onClick={onClose}
            >
                <form
                    className={isOpen ? 'popup__content popup__contentActive' : 'popup__content'}
                    onClick={e => e.preventDefault()}
                >
                    <button
                        type='button'
                        onClick={() => dispatch(changePasswordResetSuccsessModalVisibility(false))}
                        className='popup__close'
                    />
                    <div className={cl.success__content}>
                        <div className={cl.success__title}>Success!</div>
                        <div className={cl.success__body}>
                            <div className={cl.success__text}>
                                <div className=''>The password reset link has been sent on your email: </div>
                                <div className={cl.success__email}>
                                    {customEmail}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
