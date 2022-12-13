import { AutoComplete, Button, Cascader, Input, Select } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../hooks/useRedux';
import { IAd } from '../../../types/types';
import { List } from '../../List';
import { LostSearchItem } from './LostSearchItem';


export const LostSearch = () => {

    const { Option } = Select
    const categories = useAppSelector(state => state.data.data.categories)
    const ads = useAppSelector(state => state.data.data.ads)

    return (
        <div className="content__lostSearch__container">
            <div className="content__lostSearch">
                <div className="lostSearch__title">
                    Search for lost things
                </div>
                <div className="lostSearch__inputBlock">
                    <Input.Group compact>
                        <Select defaultValue="None" style={{ width: '30%' }}>
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
                            style={{ width: '70%' }}
                            placeholder="Text (not required)"
                        />
                    </Input.Group>
                </div>
                <div className="lostSearch__items__container">
                    <div className="lostSearch__items">
                        <List
                            items={ads}
                            renderItem={(ad: IAd) => <LostSearchItem ad={ad} key={ad.id} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
