import React, { useState } from 'react'
import { useInput } from '../../../hooks/useInput'
import { checkLogin } from '../../../utils/utils'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { GreenLongBtn } from '../button/GreenLongBtn'
import { BlueCheckbox } from '../checkbox/BlueCheckbox'
import { AuthInput } from '../input/AuthInput'

export const LoginForm = () => {

    const login = useInput('')
    const password = useInput('')
    const [isVisiblePassword1, setVisiblePassword1] = useState<boolean>(false)
    const [isChecked, setChecked] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (checkLogin(login.value)) {
            //do smth
        } else {
            setError('Login must be from 3 to 20 symbols')
        }
        console.log(login.value, password.value, isChecked);
    }

    const changeVisibilityHandlerPassw1 = () => setVisiblePassword1(!isVisiblePassword1)

    const changeCheckboxHadnler = () => {
        setChecked(!isChecked)
    }


    return (
        <form
            className="auth__content"
            onSubmit={e => formSubmitHandler(e)}
        >
            <div className="auth__text">Login</div>
            <div className="authFormError">{error}</div>
            <AuthInput
                value={login.value}
                onChange={login.onChange}
            />
            <div className="auth__text">Password</div>
            <div className='rowContainter'>
                <AuthInput
                    value={password.value}
                    onChange={password.onChange}
                    type={isVisiblePassword1 ? 'text' : 'password'}
                />
                <div
                    className={isVisiblePassword1 ? 'hiddenPasswordIcon' : 'visiblePasswordIcon'}
                    onClick={() => changeVisibilityHandlerPassw1()}
                >
                </div>
            </div>
            <div className='loginFormError'>{error}</div>
            <BlueCheckbox
                text='Remember Me'
                checked={isChecked}
                onChange={changeCheckboxHadnler}
            />
            <div className="centerContainer">
                <AnitmatedBtn>
                    Login
                </AnitmatedBtn>
            </div>
        </form>
    )
}
