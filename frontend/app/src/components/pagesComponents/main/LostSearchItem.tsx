import { Button } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAd } from '../../../types/types'
import { AD_PATH_NAME } from '../../../utils/constants'

interface LostSearchItemProps {
    ad: IAd
}

export const LostSearchItem: FC<LostSearchItemProps> = ({ ad }) => {

    const navigate = useNavigate()
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
            <Button
                type='primary'
                onClick={() => navigate(`/${AD_PATH_NAME}/${ad.slug}`)}
            >
                Read more
            </Button>
        </div>
    )
}
