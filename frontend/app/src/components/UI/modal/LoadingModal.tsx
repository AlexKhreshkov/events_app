import cl from './LoadingModal.module.css'

import { useAppSelector } from '../../../hooks/useRedux'

import { Spin } from 'antd'

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
