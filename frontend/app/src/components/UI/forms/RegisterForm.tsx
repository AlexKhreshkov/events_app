import React, { useState } from 'react'
import { useInput } from '../../../hooks/useInput'
import { checkLogin } from '../../../utils/utils'
import { AnitmatedBtn } from '../button/AnitmatedBtn'
import { BlueCheckbox } from '../checkbox/BlueCheckbox'
import { AuthInput } from '../input/AuthInput'

export const RegisterForm = () => {

    const login = useInput('')
    const password1 = useInput('')
    const password2 = useInput('')
    const [isVisiblePassword1, setVisiblePassword1] = useState<boolean>(false)
    const [isVisiblePassword2, setVisiblePassword2] = useState<boolean>(false)
    const [isChecked, setChecked] = useState<boolean>(true)
    const [formErrors, setFormErrors] = useState({
        login: '',
        underForm: '',
    })

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log(login.value, password1.value, password2.value, isChecked);
        if (!checkLogin(login.value)) {
            setFormErrors(prev => (
                {
                    ...prev,
                    login: 'Login must be from 3 to 20 symbols'
                }
            ))
        } else {
            setFormErrors(prev => (
                {
                    ...prev,
                    login: ''
                }
            ))
            if (password1.value === password2.value) {
                setFormErrors(prev => (
                    {
                        ...prev,
                        underForm: ''
                    }
                ))
                const userInfoForm = {
                    username: login.value,
                    password: password1.value
                }
                // fetch(`http://127.0.0.1:8000/api/v1/auth/users/`, {
                //     method: 'PA',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(userInfoForm),
                // })
                // console.log(profileNewPic);
                console.log(login.value, password1.value, password2.value, isChecked);
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    underForm: `Passwords don't match`
                }))
            }
        }
    }
    const changeVisibilityHandlerPassw1 = () => setVisiblePassword1(!isVisiblePassword1)
    const changeVisibilityHandlerPassw2 = () => setVisiblePassword2(!isVisiblePassword2)
    const changeCheckboxHadnler = () => {
        setChecked(!isChecked)
    }

    return (
        <form
            className="auth__content"
            onSubmit={e => formSubmitHandler(e)}
        >
            <div className="auth__text">Login</div>
            <AuthInput
                value={login.value}
                onChange={login.onChange}
            />
            <div className='authFormError'>{formErrors.login}</div>
            <div className="auth__text">Password</div>
            <div className='rowContainter'>
                <AuthInput
                    value={password1.value}
                    onChange={password1.onChange}
                    type={isVisiblePassword1 ? 'text' : 'password'}
                />
                <div
                    className={isVisiblePassword1 ? 'hiddenPasswordIcon' : 'visiblePasswordIcon'}
                    onClick={() => changeVisibilityHandlerPassw1()}
                >
                </div>
            </div>
            <div className="auth__text">Repeat password</div>
            <div className='rowContainter'>
                <AuthInput
                    value={password2.value}
                    onChange={password2.onChange}
                    type={isVisiblePassword2 ? 'text' : 'password'}
                />
                <div
                    className={isVisiblePassword2 ? 'hiddenPasswordIcon' : 'visiblePasswordIcon'}
                    onClick={() => changeVisibilityHandlerPassw2()}
                >
                </div>
            </div>
            <div className='authFormError'>{formErrors.underForm}</div>
            <BlueCheckbox
                text='Remember Me'
                checked={isChecked}
                onChange={changeCheckboxHadnler}
            />
            <div className="centerContainer">
                <AnitmatedBtn>
                    SignIn
                </AnitmatedBtn>
            </div>
        </form>
    )
}
