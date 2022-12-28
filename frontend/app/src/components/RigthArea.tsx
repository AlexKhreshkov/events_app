import { useAppSelector } from '../hooks/useRedux'

import { ROUTES_PATH } from '../utils/constants'

import { Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'

export const RigthArea = () => {
    const currentUser = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.info('To create your ad You must login first.');
    };

    const handleClick = () => {
        if (currentUser.currentUser.username && currentUser.authToken) {
            navigate(`${ROUTES_PATH.CreateAd}`)
        } else {
            info()
        }
    }

    return (
        <div className='content__rightArea'>
            {contextHolder}
            <div className='content__makeАdvertising'>
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
