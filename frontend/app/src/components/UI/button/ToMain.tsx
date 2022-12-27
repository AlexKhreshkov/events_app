import { Button } from 'antd'
import { IoArrowUndoOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const ToMain = () => {

    const navigate = useNavigate()

    return (
        <div className='back'>
            <Button onClick={() => navigate('/')} type={'primary'}>
                <IoArrowUndoOutline />
                Back
            </Button>
        </div>
    )
}
