import { Button, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useRedux'

export const RigthArea = () => {
    const currentUser = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info('To create your ad You must login first.');
    };

    const handleClick = () => {
        if (currentUser.currentUser.username && currentUser.authToken) {
            navigate('/announcement/create')
        } else {
            info()
        }
    }

    return (
        <div className="content__rightArea">
            {contextHolder}
            <div className="content__makeАdvertising">
                <Button
                    block
                    size={'large'}
                    type={'primary'}
                    onClick={handleClick}
                >
                    Create advertising
                </Button>
            </div>
        </div>
    )
}
