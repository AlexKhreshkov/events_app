import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NewPasswordModal } from '../components/UI/modal/DataInputModal/NewPasswordModal'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { changeNewPasswordVisibilityModal } from '../store/authModalSlice'

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
