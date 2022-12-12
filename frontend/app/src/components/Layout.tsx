import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { defineUser } from '../api/authApi'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { changeLoaderFullSizeVisibility } from '../store/authModalSlice'
import { addUser } from '../store/authSlice'
import { changeLoadingStatus } from '../store/isLoadingSlice'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

export const Layout = () => {

    const isLoading = useAppSelector(state => state.authModal.isLoaderFullSize)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
            defineUser(authToken)
                .then(response => {
                    const userInfo = response.data
                    dispatch(addUser({ ...userInfo, password: '', authToken }))
                })
                .catch(error => dispatch(addUser({
                    id: -1,
                    username: '',
                    email: '',
                    password: '',
                    authToken,
                })))
                .finally(() => dispatch(changeLoaderFullSizeVisibility(false)))
        } else {
            dispatch(changeLoaderFullSizeVisibility(false))
        }
    }, [])

    return (
        <>
            {isLoading
                ?
                <div className="loaderContainer">
                    <Spin size={'large'} />
                </div>
                :
                <div className='container'>
                    <Navigation />
                    <Outlet />
                    <Footer />
                </div>
            }
        </>
    )
}
