import React from 'react'

interface ListProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}


export function List<T>(props: ListProps<T>) {
    
    return (
        <>
            {props.items.map(props.renderItem)}
        </>
    )
}