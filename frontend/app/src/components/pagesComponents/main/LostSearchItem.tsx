import { Button } from 'antd'
import React, { FC } from 'react'
import { IAd } from '../../../types/types'

interface LostSearchItemProps {
    ad: IAd
}

export const LostSearchItem: FC<LostSearchItemProps> = ({ ad }) => {
    return (
        <div className="lostSearch__item">
            <div className="lostSearch__item__category">
                Category: <span>{ad.category_name}</span>
            </div>
            <div className="lostSearch__item__title">
                {ad.title}
            </div>
            <div className="lostSearch__item__img">
                <img src={ad.image} alt="" />
            </div>
            <Button type='primary'>Read more</Button>
        </div>
    )
}
