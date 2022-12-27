import cl from './EmailConfirmedSuccessModal.module.css'

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changeEmailConfirmedSuccessModalVisibility } from '../../../../store/authModalSlice'


export const EmailConfirmedSuccessModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isEmailConfirmed)
    const dispatch = useAppDispatch()


    return (
        <div id='popup' className={isOpen ? 'popup popupAcitve' : 'popup'}>
            <div
                className='popup__body'
            >
                <form
                    className={isOpen ? 'popup__content popup__contentActive' : 'popup__content'}
                >
                    <button
                        type='button'
                        onClick={() => dispatch(changeEmailConfirmedSuccessModalVisibility(false))}
                        className='popup__close'
                    />
                    <div className={cl.success__content}>
                        <div className={cl.success__title}>Success!</div>
                        <div className={cl.success__body}>
                            <div className={cl.success__text}>
                                <div className=''>
                                    Your email has confirmed.
                                </div>
                                <div className=''>
                                    Now you can login.
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
