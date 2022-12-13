import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { defineUser } from '../api/authApi'
import { getAds, getCategories } from '../api/getData'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { useRequest } from '../hooks/useRequest'
import { changeLoaderFullSizeVisibility } from '../store/authModalSlice'
import { addUser } from '../store/authSlice'
import { addAds, addCategories } from '../store/dataSlice'
import { changeLoadingStatus } from '../store/isLoadingSlice'
import { IAd, ICategory } from '../types/types'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

export const Layout = () => {

    const isLoading = useAppSelector(state => state.authModal.isLoaderFullSize)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')

        getCategories()
            .then(respone => respone.data)
            .then((data: ICategory[]) => dispatch(addCategories(data)))

        getAds()
            .then(response => response.data)
            .then((data: IAd[]) => dispatch(addAds(data)))

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
