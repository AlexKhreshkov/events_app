import React, { FC } from 'react'
import classes from './AuthInput.module.css'

interface AuthInputProps {
    type?: string
    value?: string
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
}

export const AuthInput: FC<AuthInputProps> = ({ type, value, placeholder, onChange, onBlur }) => {
    return (
        <input
            className={classes.authInput}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={event => onChange?.(event)}
            onBlur={() => onBlur?.()}
            required
        >
        </input>
    )
}
