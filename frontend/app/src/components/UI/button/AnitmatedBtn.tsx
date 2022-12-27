import classes from './AnitmatedBtn.module.css'

import React, { FC, PropsWithChildren } from 'react'

interface AnitmatedBtnProps extends PropsWithChildren {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    color?: string
    disabled?: boolean
}

export const AnitmatedBtn: FC<AnitmatedBtnProps> = ({ children, onClick, color, disabled }) => {

    const btnBackgroundColor = color

    if (color) {
        return (
            <button
                className={classes.btn}
                onClick={event => onClick?.(event)}
                disabled={disabled}
                style={{ backgroundColor: btnBackgroundColor }}
            >
                {children}
            </button>
        )
    }
    return (
        <button
            className={classes.btn}
            onClick={event => onClick?.(event)}
            disabled={disabled}
            type={'button'}
        >
            <span>
                {children}
            </span>
        </button>
    )
}
