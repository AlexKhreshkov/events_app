import { addFavouriteAd } from '../../../store/favouritesAdsSlice'
import { IAd } from '../../../types/types'
import { AD_PATH_NAME } from '../../../utils/constants'
import { reformatDate } from '../../../utils/utils'

import { Button } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface LostSearchItemProps {
    ad: IAd,
    setCategory?: React.Dispatch<React.SetStateAction<string>>
}

export const LostSearchItem: FC<LostSearchItemProps> = ({ ad, setCategory }) => {

    const navigate = useNavigate()
    const disaptch = useDispatch()
    const handleAdToFavorite = () => disaptch(addFavouriteAd(ad))

    return (
        <div className='lostSearch__item'>
            <div className='lostSearch__item__created'>
                {reformatDate(ad.created)}
            </div>
            <div className='lostSearch__item__category'>
                <div className='lostSearch__item__category__text'>Category:</div>
                <Button
                    className='lostSearch__item__category__tag'
                    size='small'
                    type='dashed'
                    onClick={() => setCategory && setCategory(ad.category_name)}
                >
                    {ad.category_name}
                </Button>
            </div>
            <Button
                className='lostSearch__item__category__tag'
                size='small'
                type='default'
                onClick={handleAdToFavorite}
            >
                Save to read later
            </Button>
            <div className='lostSearch__item__title'>
                {ad.title}
            </div>
            <div className='lostSearch__item__img'>
                <img src={ad.image} alt='' />
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
