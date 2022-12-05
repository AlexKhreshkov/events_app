import React from 'react'
import { RegisterForm } from '../components/UI/forms/RegisterForm'

export const Register = () => {
    return (
        <div className='auth__container'>
            <div className="auth__title">Sing Up</div>
            <RegisterForm />
            <div className="centerContainer">
                <div className="auth__helpText accountHelpText">
                    <div>Have an account?</div>
                    <div>Login</div>
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
