import React, { FC, PropsWithChildren } from 'react'
import classes from './AnitmatedBtn.module.css'

interface AnitmatedBtnProps extends PropsWithChildren {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    color?: string
}

export const AnitmatedBtn: FC<AnitmatedBtnProps> = ({ children, onClick, color }) => {

    const btnBackgroundColor = color

    if (color) {
        return (
            <button
                className={classes.btn}
                onClick={event => onClick?.(event)}
                style={{ backgroundColor: btnBackgroundColor }}
            >
                <span>
                    {children}
                </span>
            </button>
        )
    }
    return (
        <button
            className={classes.btn}
            onClick={event => onClick?.(event)}
        >
            <span>
                {children}
            </span>
        </button>
    )
}
