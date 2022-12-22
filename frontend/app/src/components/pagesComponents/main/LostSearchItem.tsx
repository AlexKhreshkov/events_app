import { Button, Tag } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { IAd } from '../../../types/types'
import { AD_PATH_NAME } from '../../../utils/constants'
import { reformatDate } from '../../../utils/utils'

interface LostSearchItemProps {
    ad: IAd,
    category?: string,
    setCategory?: React.Dispatch<React.SetStateAction<string>>
}

export const LostSearchItem: FC<LostSearchItemProps> = ({ ad, category, setCategory }) => {

    const navigate = useNavigate()
    return (
        <div className="lostSearch__item">
            <div className='lostSearch__item__created'>
                {reformatDate(ad.created)}
            </div>
            <div className="lostSearch__item__category">
                <span className='lostSearch__item__category__text'>Category:</span>
                <Tag
                    className='lostSearch__item__category__tag'
                    onClick={() => setCategory && setCategory(ad.category_name)}
                >
                    {ad.category_name}
                </Tag>
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
