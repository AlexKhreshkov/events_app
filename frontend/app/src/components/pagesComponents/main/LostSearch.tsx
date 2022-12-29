import { LostSearchItem } from './LostSearchItem';

import { useInput } from '../../../hooks/useInput';
import { useAppSelector } from '../../../hooks/useRedux';
import { IAd } from '../../../types/types';
import { ADS_LIMIT } from '../../../utils/constants';
import { List } from '../../List';

import { Loader } from '../../Loader';

import { Input, Select } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

export const LostSearch = () => {

    const { Option } = Select
    const categories = useAppSelector(state => state.categories.categories)
    const ads = useAppSelector(state => state.ads.ads)
    const search = useInput()
    const [category, setCategory] = useState('All')
    const [limitedAds, setLimitedAds] = useState<IAd[]>(ads.slice(0, ADS_LIMIT))
    const lastElement = useRef<HTMLDivElement | null>(null)
    const observer = useRef<IntersectionObserver>()
    const limitedAdsLen = limitedAds.length
    const [isExtraEdsLoading, setExtraAdsLoading] = useState(false)

    const adsWithCategory = useMemo(() => {
        if (category === 'All') {
            return limitedAds
        } else
            return limitedAds.filter(ad => ad.category_name === category)
    }, [category, limitedAds])

    const searchedAds = useMemo(() => {
        return adsWithCategory.filter(ad => {
            return ad.title.toLowerCase().includes(search.value.toLowerCase()) ||
                ad.category_name.toLowerCase().includes(search.value.toLowerCase())
        })
    }, [adsWithCategory, search])


    //add ADS_LIMIT ads when scroll to the end of page
    useEffect(() => {
        if (observer.current) observer.current.disconnect()
        const callback = function (entries: any) {
            //LOADER EMULATION(IN CASE IT WAS REQUEST TO THE SERVER)
            if (entries[0].isIntersecting && limitedAdsLen < ads.length) {
                setExtraAdsLoading(true)
                setTimeout(() => {
                    setLimitedAds([...limitedAds, ...ads.slice(limitedAdsLen, limitedAdsLen + ADS_LIMIT)])
                    setExtraAdsLoading(false)
                }, 1000)
            }
        }
        observer.current = new IntersectionObserver(callback)
        const lastElem = lastElement.current
        if (lastElem)
            observer.current.observe(lastElem)
    }, [limitedAdsLen, category])

    return (
        <div className='content__lostSearch__container'>
            {isExtraEdsLoading && <Loader />}
            <div className='content__lostSearch'>
                <div className='lostSearch__title'>
                    Search for lost things
                </div>
                <div className='lostSearch__inputBlock'>
                    <Input.Group compact>
                        <Select
                            defaultValue='All'
                            style={{ width: '30%' }}
                            value={category}
                            onSelect={chosenSelect => setCategory(chosenSelect)}
                        >
                            <Option
                                value={'All'}
                            >
                                <>All</>
                            </Option>
                            {categories.map(category =>
                                <Option
                                    key={category.slug}
                                    value={category.name}
                                >
                                    {category.name}
                                </Option>,
                            )}
                        </Select>
                        <Input
                            value={search.value}
                            onChange={e => search.setValue(e.target.value)}
                            style={{ width: '70%' }}
                            placeholder='Text (not required)'
                            allowClear
                        />
                    </Input.Group>
                </div>
                <div className='lostSearch__items__container'>
                    <div className='lostSearch__items'>
                        {searchedAds.length
                            ?
                            <List
                                items={searchedAds}
                                renderItem={(ad: IAd) =>
                                    <LostSearchItem
                                        key={ad.id}
                                        ad={ad}
                                        setCategory={setCategory}
                                    />
                                }
                            />
                            :
                            <div className='lostSearch__noAds'>No Ads found...</div>
                        }
                    </div>
                    {category === 'All'
                        ?
                        <div
                            ref={lastElement}
                            className='lastElement'
                            data-testid='lastElement'
                        >
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}
