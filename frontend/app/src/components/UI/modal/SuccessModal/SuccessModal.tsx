import cl from './SuccessModal.module.css'

import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { changeSuccsessModalVisibility } from '../../../../store/authModalSlice'

export const SuccessModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isSuccessModal)
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
                        onClick={() => dispatch(changeSuccsessModalVisibility(false))}
                        className='popup__close'
                    />
                    <div className={cl.success__content}>
                        <div className={cl.success__title}>Success!</div>
                        <div className={cl.success__body}>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
