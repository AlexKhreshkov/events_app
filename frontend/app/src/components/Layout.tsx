import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

export const Layout = () => {
    return (
        <>
            <div className='container'>
                <Navigation />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}
