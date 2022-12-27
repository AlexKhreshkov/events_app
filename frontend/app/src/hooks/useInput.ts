import { useInputValidation } from './useInputValidation'

import { IValidations } from '../types/types'

import { useState } from 'react'


export const useInput = (initialValue?: string, validations?: IValidations) => {
    const [value, setValue] = useState<string>(initialValue ? initialValue : '')
    const [isDirty, setDirty] = useState<boolean>(false)
    const valid = useInputValidation(value, validations)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value, onChange, onBlur, setValue, setDirty, isDirty, ...valid,
    }
}