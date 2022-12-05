import { useState } from "react"

export function useInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value)
    }
    
    return {
        value, onChange
    }
}