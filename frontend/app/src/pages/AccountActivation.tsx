import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { activeAccount } from '../api/authApi'
import { LoadingModal } from '../components/UI/modal/LoadingModal'
import { useAppDispatch } from '../hooks/useRedux'
import { changeEmailConfirmedSuccessModalVisibility } from '../store/authModalSlice'
import { IAccountActivationError } from '../types/types'

export const AccountActivation = () => {


    const dispatch = useAppDispatch()
    let navigate = useNavigate();
    const { uid, token } = useParams<{ uid: string, token: string }>()
    const [activatonError, setActivationError] = useState<IAccountActivationError>({})


    useEffect(() => {
        activeAccount({ uid, token })
            .catch(error => {
                setActivationError(error.response.data)
                throw error
            })
            .then(() => {
                navigate('/')
            })
            .then(() => setTimeout(() => dispatch(changeEmailConfirmedSuccessModalVisibility(true)), 1000))
    }, [])

    return (
        <>
            <div>
                {activatonError.detail
                    ?
                    <div>{activatonError.detail}</div>
                    :
                    <></>
                }
                {activatonError.uid
                    ?
                    <div>{activatonError.uid}</div>
                    :
                    <></>
                }
                {activatonError.token
                    ?
                    <div>{activatonError.token}</div>
                    :
                    <></>
                }
            </div>
            <>
                <LoadingModal />
            </>
        </>
    )
}
