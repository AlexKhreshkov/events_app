import classes from './AuthInput.module.css'

import React, { FC } from 'react'

interface AuthInputProps {
    type?: string
    value?: string
    placeholder?: string
    required?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: () => void
}

export const AuthInput: FC<AuthInputProps> = ({ type, value, placeholder, required, onChange, onBlur }) => {
    return (
        <input
            className={classes.authInput}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={event => onChange?.(event)}
            onBlur={() => onBlur?.()}
            required={required}
        >
        </input>
    )
}
