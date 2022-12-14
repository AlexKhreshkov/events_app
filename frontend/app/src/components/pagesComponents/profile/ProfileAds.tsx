import { useAppSelector } from '../../../hooks/useRedux'
import { IAd } from '../../../types/types'
import { List } from '../../List'
import { LostSearchItem } from '../main/LostSearchItem'

import { AdItem } from '../../AdItem'

import React from 'react'

export const ProfileAds = () => {

    const ads = useAppSelector(state => state.ads.ads)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const usersAds = ads.filter(ad => ad.user_id === currentUser.id)

    return (
        <div className='profile__ads'>
            {usersAds.length
                ?
                <List
                    items={usersAds}
                    renderItem={(ad: IAd) =>
                        <AdItem
                            key={ad.id}
                            ad={ad}
                            isDeleteBtn={true}
                        />
                    }
                />
                :
                <div className='lostSearch__noAds'>You haven't created any ads</div>
            }
        </div>
    )
}
