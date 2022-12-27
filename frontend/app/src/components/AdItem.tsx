import { changeFavouritesAdsOpen } from '../store/authModalSlice'
import { deleteFavouriteAd } from '../store/favouritesAdsSlice'
import { IAd } from '../types/types'
import { AD_PATH_NAME } from '../utils/constants'
import { reformatDate } from '../utils/utils'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FC } from 'react'
import { Button } from 'antd'

interface AdItemProps {
    ad: IAd,
}

export const AdItem: FC<AdItemProps> = ({ ad }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeFromFavourites = () => dispatch(deleteFavouriteAd(ad.id))
    const readMoreHandler = () => {
        dispatch(changeFavouritesAdsOpen(false))
        navigate(`${AD_PATH_NAME}/${ad.slug}`)
    }

    return (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
            <hr />
            <div className='lostSearch__item'>
                <div className='lostSearch__item__created'>
                    {reformatDate(ad.created)}
                </div>
                <div className='lostSearch__item__category'>
                    <div className='lostSearch__item__category__text'>
                        Category:
                    </div>
                    <Button
                        className='lostSearch__item__category__tag'
                        size='small'
                        type='dashed'
                        disabled
                    >
                        {ad.category_name}
                    </Button>
                </div>
                <Button
                    size='small'
                    onClick={removeFromFavourites}
                    danger
                >
                    Remove
                </Button>
                <div className='lostSearch__item__title'>
                    {ad.title}
                </div>
                <div
                    className='lostSearch__item__img'
                >
                    <img src={ad.image} alt='' />
                </div>
                <Button
                    type='primary'
                    onClick={readMoreHandler}
                >
                    Read more
                </Button>
            </div>
        </div>
    )
}
