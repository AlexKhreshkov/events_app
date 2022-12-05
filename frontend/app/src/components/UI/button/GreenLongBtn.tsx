import React, { FC, PropsWithChildren } from 'react'
import classes from './GreenLongBtn.module.css'

interface GreenLongBtnProps extends PropsWithChildren {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const GreenLongBtn: FC<GreenLongBtnProps> = ({ children, onClick }) => {
    return (
        <button
            className={classes.btn}
            onClick={event => onClick?.(event)}
        >
            {children}
        </button>
    )
}
