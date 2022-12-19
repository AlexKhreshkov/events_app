import { Spin } from 'antd'
import { useAppSelector } from '../../../hooks/useRedux'
import cl from './LoadingModal.module.css'

export const LoadingModal = () => {

    const isOpen = useAppSelector(state => state.authModal.isLoaderFullSize)

    return (
        <>
            {isOpen
                ?
                <div className={cl.loaderContainer}>
                    <div className={cl.loaderBody}>
                        <Spin size='large' />
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}
