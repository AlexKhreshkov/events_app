import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { changeFavouritesAdsOpen } from '../../../store/authModalSlice';
import { List } from '../../List';
import { IAd } from '../../../types/types';
import { AdItem } from '../../AdItem';

export const FavouritesAds: React.FC = () => {

    const isFavouritesAdsOpen = useAppSelector(state => state.authModal.isFavouritesAds)
    const favouritesAds = useAppSelector(state => state.favouritesAds.favouritesAds)
    const dispatch = useAppDispatch()
    const handelOff = () => dispatch(changeFavouritesAdsOpen(false))

    return (
        <>
            <Modal
                title={favouritesAds.length ? 'Saved ads' : 'No saved ads'}
                centered
                open={isFavouritesAdsOpen}
                onOk={handelOff}
                onCancel={handelOff}
                width={1000}
                footer={[]}
            >
                <List
                    items={favouritesAds}
                    renderItem={(ad: IAd) =>
                        <AdItem
                            key={ad.id}
                            ad={ad}
                        />
                    }
                />
            </Modal>
        </>
    );
};

