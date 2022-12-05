import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { IoPersonOutline, IoHeartOutline } from "react-icons/io5";
import { LoginModal } from './UI/modal/LoginModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { changeSignInVisibility, changeSignUpVisibility } from '../store/authModalSlice';
import { RegisterModal } from './UI/modal/RegisterModal';



export const Navigation = () => {

    const isOpen = useAppSelector(state => state.authModal.isSignIn)
    const dispatch = useAppDispatch()

    return (
        <div className='nav__container'>
            <div className="nav">
                <Link to='/'>
                    <div className="nav__title">NZEvents</div>
                </Link>
                <div className="nav__items">
                    <div onClick={e => dispatch(changeSignInVisibility(!isOpen))} className="nav__item">
                        <IoPersonOutline />
                    </div>
                    <div className="nav__item liked">
                        <IoHeartOutline />
                        <div className="liked_count">1</div>
                    </div>
                </div>
            </div>
            <LoginModal />
            <RegisterModal/>
        </div>
    )
}
