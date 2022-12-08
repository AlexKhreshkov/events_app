import { useEffect, useState } from "react";



export function useRequest(callBack: () => Promise<any>) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        callBack()
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [])

    return [data, loading, error]
}  