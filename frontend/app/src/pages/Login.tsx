import React from 'react'
import { LoginForm } from '../components/UI/forms/LoginForm'

export const Login = () => {
    return (
        <div className='auth__container'>
            <div className="auth__title">Sing In</div>
            <LoginForm />
            <div className="centerContainer">
                <div className="auth__helpText accountHelpText">
                    <div>Don't have an account?</div>
                    <div>SignUp</div>
                </div>
            </div>
            <div className="centerContainer">
                <div className="auth__helpText accountHelpPassword">
                    <div>Forgot your password?</div>
                    <div>Reset</div>
                </div>
            </div>
        </div>
    )
}
