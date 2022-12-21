import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { fetchAds } from '../store/adsSlice'
import { changeLoaderFullSizeVisibility } from '../store/authModalSlice'
import { addCurrentUser, addToken, defineCurrentUser } from '../store/authSlice'
import { fetchCategories } from '../store/categoriesSlice'
import { fetchUsers } from '../store/usersSlice'
import { Footer } from './Footer'
import { Loader } from './Loader'
import { Navigation } from './Navigation'

export const Layout = () => {

    const isLoading = useAppSelector(state => state.authModal.isLoaderFullSize)
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function prepeareData() {
            const authToken = localStorage.getItem('authToken')
            dispatch(addToken(authToken))
            dispatch(changeLoaderFullSizeVisibility(true))
            await dispatch(fetchCategories())
            await dispatch(fetchAds())
            await dispatch(fetchUsers())
            if (authToken) {
                await dispatch(defineCurrentUser())
                dispatch(changeLoaderFullSizeVisibility(false))
            }
            else {
                dispatch(changeLoaderFullSizeVisibility(false))
            }
        }
        prepeareData()
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
