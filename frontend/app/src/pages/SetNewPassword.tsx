import { NewPasswordModal } from '../components/UI/modal/DataInputModal/NewPasswordModal'
import { useAppDispatch } from '../hooks/useRedux'
import { changeNewPasswordVisibilityModal } from '../store/authModalSlice'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const ResetPassword = () => {

    const dispatch = useAppDispatch()
    const { uid, token } = useParams<{ uid: string, token: string }>()

    useEffect(() => {
        dispatch(changeNewPasswordVisibilityModal(true))
    }, [])

    return (
        <>
            <NewPasswordModal uid={uid} token={token} />
        </>
    )
}
