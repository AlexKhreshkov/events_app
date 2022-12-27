import classes from './GreenLongBtn.module.css'

import React, { FC, PropsWithChildren } from 'react'

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
