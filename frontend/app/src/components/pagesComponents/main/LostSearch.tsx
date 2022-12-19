import { AutoComplete, Button, Cascader, Input, Select } from 'antd'
import { useMemo, useState } from 'react';
import { useInput } from '../../../hooks/useInput';
import { useAppSelector } from '../../../hooks/useRedux';
import { IAd } from '../../../types/types';
import { List } from '../../List';
import { LostSearchItem } from './LostSearchItem';


export const LostSearch = () => {

    const { Option } = Select
    const categories = useAppSelector(state => state.data.data.categories)
    const ads = useAppSelector(state => state.data.data.ads)
    const search = useInput()
    const [category, setCategory] = useState('All')


    const adsWithCategory = useMemo(() => {
        if (category === 'All') {
            return ads
        } else
            return ads.filter(ad => ad.category_name === category)
    }, [category, ads])

    const searchedAds = useMemo(() => {
        return adsWithCategory.filter(ad => {
            return ad.title.toLowerCase().includes(search.value.toLowerCase()) ||
                ad.category_name.toLowerCase().includes(search.value.toLowerCase())
        })
    }, [adsWithCategory, search])


    return (
        <div className="content__lostSearch__container">
            <div className="content__lostSearch">
                <div className="lostSearch__title">
                    Search for lost things
                </div>
                <div className="lostSearch__inputBlock">
                    <Input.Group compact>
                        <Select
                            defaultValue="All"
                            style={{ width: '30%' }}
                            onSelect={chosenSelect => setCategory(chosenSelect)}
                        >
                            {categories.map(category =>
                                <Option
                                    key={category.slug}
                                    value={category.name}
                                >
                                    {category.name}
                                </Option>
                            )}
                        </Select>
                        <Input
                            value={search.value}
                            onChange={e => search.setValue(e.target.value)}
                            style={{ width: '70%' }}
                            placeholder="Text (not required)"
                        />
                    </Input.Group>
                </div>
                <div className="lostSearch__items__container">
                    <div className="lostSearch__items">
                        {searchedAds.length
                            ?
                            <List
                                items={searchedAds}
                                renderItem={(ad: IAd) => <LostSearchItem ad={ad} key={ad.id} />}
                            />
                            :
                            <div className='lostSearch__noAds'>No Ads :(</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
