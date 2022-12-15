import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { defineUser } from '../api/authApi'
import { getAds, getCategories, getUsers } from '../api/getData'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { changeLoaderFullSizeVisibility } from '../store/authModalSlice'
import { addUser } from '../store/authSlice'
import { addAds, addCategories, addUsers } from '../store/dataSlice'
import { IAd, ICategory, IUser } from '../types/types'
import { Footer } from './Footer'
import { Loader } from './Loader'
import { Navigation } from './Navigation'

export const Layout = () => {

    const isLoading = useAppSelector(state => state.authModal.isLoaderFullSize)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        dispatch(changeLoaderFullSizeVisibility(true))

        getCategories()
            .then(respone => respone.data)
            .then((data: ICategory[]) => dispatch(addCategories(data)))
            .then(() => getAds())
            .then(response => response.data)
            .then((data: IAd[]) => dispatch(addAds(data)))
            .then(() => getUsers())
            .then(response => response.data)
            .then((data: IUser[]) => dispatch(addUsers(data)))
            .then(() => {
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
            })
    }, [])

    return (
        <>
            {isLoading
                ?
                <Loader />
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
