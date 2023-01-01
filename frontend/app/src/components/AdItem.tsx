import { changeFavouritesAdsOpen } from '../store/authModalSlice'
import { deleteFavouriteAd } from '../store/favouritesAdsSlice'
import { IAd } from '../types/types'
import { AD_PATH_NAME } from '../utils/constants'
import { reformatDate } from '../utils/utils'

import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { Button, message } from 'antd'
import { deleteAd } from '../store/adsSlice'
import { useAppDispatch } from '../hooks/useRedux'

interface AdItemProps {
    ad: IAd,
    isDeleteBtn?: boolean,
    isRemoveFromSaved?: boolean
}

export const AdItem: FC<AdItemProps> = ({ ad, isDeleteBtn = false, isRemoveFromSaved = false }) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const removeFromFavourites = () => dispatch(deleteFavouriteAd(ad.id))
    const readMoreHandler = () => {
        dispatch(changeFavouritesAdsOpen(false))
        navigate(`/${AD_PATH_NAME}/${ad.slug}`)
    }
    const handleDelete = async () => {
        const response = await dispatch(deleteAd(ad?.slug))
        if (response.meta.requestStatus === 'rejected') {
            messageApi.error(response.payload)
        }
    }

    return (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
            <hr />
            <div className='savedAd'>
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
                {isRemoveFromSaved
                    ?
                    <Button
                        size='small'
                        onClick={removeFromFavourites}
                        danger
                    >
                        Remove
                    </Button>
                    :
                    <></>
                }
                {isDeleteBtn
                    ?
                    <Button
                        size='small'
                        onClick={handleDelete}
                        danger
                    >
                        DELETE
                    </Button>
                    :
                    <></>
                }
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
