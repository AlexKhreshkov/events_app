import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { changeSuccesRegistrationVisibility } from '../../../store/authModalSlice'
import cl from './SuccessRegisterModal.module.css'


export const SuccessRegisterModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSuccesRegistration)
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.user.email)

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
                        onClick={() => dispatch(changeSuccesRegistrationVisibility(false))}
                        className="popup__close"
                    />
                    <div className={cl.success__content}>
                        <div className={cl.success__title}>Success!</div>
                        <div className={cl.success__body}>
                            <div className={cl.success__text}>
                                <div className="">The link with account activation link has been sent on your email: </div>
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
