import classes from './BlueCheckbox.module.css'

import React, { FC } from 'react'

interface BlueCheckboxProps {
    checked?: boolean
    text?: string
    onChange?: () => void
}


export const BlueCheckbox: FC<BlueCheckboxProps> = ({ checked, text, onChange }) => {
    return (
        <label className={classes.container}>{text}
            <input
                type='checkbox'
                checked={checked}
                onChange={e => onChange?.()}
            />
            <span className={classes.checkmark}></span>
        </label>
    )
}
