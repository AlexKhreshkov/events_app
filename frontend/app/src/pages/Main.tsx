import { AutoComplete, Button, Cascader, Input, Select } from 'antd'
import Search from 'antd/es/input/Search'
import React from 'react'
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
                <div className="content__findOrSerach">
                    <div className="findOrSeracrh__container">
                        <div className="findOrSeracrh">
                            <div className="findOrSeracrh__title">
                                Some Text
                            </div>
                            <div className="findOrSeracrh__input">
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className="content__lostSearch__container">
                    <div className="content__lostSearch">
                        <div className="lostSearch__title">
                            Search for lost things
                        </div>
                        <div className="lostSearch__inputBlock">
                            <Input.Group compact>
                                <Select defaultValue="No" style={{ width: '30%' }}>
                                    <Option value="Sign Up">Sign Up</Option>
                                    <Option value="Sign In">Sign In</Option>
                                </Select>
                                <Input
                                    style={{ width: '70%' }}
                                    placeholder="Text (not required)"
                                />
                            </Input.Group>
                        </div>
                        <div className="lostSearch__items__container">
                            <div className="lostSearch__items">
                                <div className="lostSearch__item">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam libero necessitatibus quis fugit esse autem, nulla, ipsam delectus consectetur, rem voluptates? Ipsam laudantium dolores, neque placeat rem at dignissimos!
                                </div>
                                <div className="lostSearch__item">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam libero necessitatibus quis fugit esse autem, nulla, ipsam delectus consectetur, rem voluptates? Ipsam laudantium dolores, neque placeat rem at dignissimos!

                                </div>
                                <div className="lostSearch__item">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam libero necessitatibus quis fugit esse autem, nulla, ipsam delectus consectetur, rem voluptates? Ipsam laudantium dolores, neque placeat rem at dignissimos!
                                </div>
                                <div className="lostSearch__item">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam libero necessitatibus quis fugit esse autem, nulla, ipsam delectus consectetur, rem voluptates? Ipsam laudantium dolores, neque placeat rem at dignissimos!
                                </div>
                                <div className="lostSearch__item">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam libero necessitatibus quis fugit esse autem, nulla, ipsam delectus consectetur, rem voluptates? Ipsam laudantium dolores, neque placeat rem at dignissimos!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <EmailConfirmedSuccessModal />
                <SuccessModal />
            </div>
        </div>
    )
}