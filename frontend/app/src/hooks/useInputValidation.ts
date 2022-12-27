import { EAvaliableValidators, IValidations } from '../types/types'

import { useEffect, useState } from 'react'

export const useInputValidation = (value: string, validations?: IValidations) => {
    const [isEmtpy, setEmpty] = useState<boolean>(true)
    const [lengthError, setLengthError] = useState<boolean>(false)

    useEffect(() => {
        for (const validation in validations) {
            if (validation === EAvaliableValidators.isEmpty) {
                value ? setEmpty(false) : setEmpty(true)
            }
            if (validations.minLength) {
                value.length < validations.minLength ? setLengthError(true) : setLengthError(false)
            }
            if (validations.maxLength) {
                value.length > validations.maxLength ? setLengthError(true) : setLengthError(false)
            }
            if (validations.minLength && validations.maxLength) {
                value.length < validations.minLength || value.length > validations.maxLength ? setLengthError(true) : setLengthError(false)
            }
        }
    }, [value])

    return {
        isEmtpy,
        lengthError,
    }

}