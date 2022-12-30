import { IAd } from '../../../types/types'

import { Input } from 'antd'
import React, { FC } from 'react'

interface AdTitleProps {
    isCommentChanging: boolean
    newAdInfoTitle: string
    ad: IAd
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AdTitle: FC<AdTitleProps> = ({ isCommentChanging, newAdInfoTitle, ad, handleChange }) => {

    return (
        <div className='adDetail__title'>
            {isCommentChanging
                ?
                <div className='displayFlex'>
                    Title:
                    <Input
                        name='title'
                        value={newAdInfoTitle}
                        onChange={e => handleChange(e)}
                    />
                </div>
                :
                <>
                    {ad.title}
                </>
            }
        </div>
    )
}
