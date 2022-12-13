import { AutoComplete, Button, Cascader, Input, Select } from 'antd'
import Search from 'antd/es/input/Search'
import React from 'react'
import { LostSearch } from '../components/pagesComponents/main/LostSearch'
import { EmailConfirmedSuccessModal } from '../components/UI/modal/SuccessModal/EmailConfirmedSuccessModal'
import { SuccessModal } from '../components/UI/modal/SuccessModal/SuccessModal'

export const Main = () => {

    const { Option } = Select;

    return (
        <div className='content__container'>
            <div className="content__rightArea">
                <div className="content__makeАdvertising">
                    <Button
                        size={'large'}
                        block
                        type={'primary'}
                    >
                        Make advertising
                    </Button>
                </div>
            </div>
            <div className="content__body">
                <div className="content__title">
                    <h1>Lost property — Palmesrton North</h1>
                </div>
                <div className="content__subtitle">
                    <div className="content__cities">
                        <div className="content__citiy">New Zeland</div>
                        <div className="citites__separeteIcon">&lt;</div>
                        <div className="content__citiy">Palmerston North</div>
                    </div>
                </div>
                <LostSearch/>
            </div>
            <div>
                <EmailConfirmedSuccessModal />
                <SuccessModal />
            </div>
        </div>
    )
}