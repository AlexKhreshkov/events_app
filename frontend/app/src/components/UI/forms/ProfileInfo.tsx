import React, { useState } from 'react'
import {
    Form,
    Input,
    Button,
    message,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { updateUserInfo } from '../../../store/usersSlice';
import { LoadingModal } from '../modal/LoadingModal';
import { Loader } from '../../Loader';

interface ProfileFormProps {
    first_name: string
    last_name: string
}
interface ImgProps {
    image: File
}

export const ProfileInfo = () => {

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.users.users)
    const user = users.find(user => user.id === currentUser.id)
    const isLoading = useAppSelector(state => state.users.loading)

    const [formState, setFormState] = useState<ProfileFormProps>({
        first_name: user?.first_name ? user.first_name : '',
        last_name: user?.last_name ? user.last_name : '',
    })
    const [imageState, setImageState] = useState<ImgProps>()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageState({
                image: e.target.files[0]
            })
        }
    }

    const [messageApi, contextHolder] = message.useMessage()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success!',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'An uknow error occured',
        });
    };

    const handleFormSumbit = () => {
        const formData = new FormData()
        if (imageState)
            formData.append("image", imageState.image)
        formData.append("first_name", formState.first_name);
        formData.append("last_name", formState.last_name);

        async function update() {
            const response = await dispatch(updateUserInfo({ id: currentUser.id, newInfo: formData }))
            if (response.meta.requestStatus === 'fulfilled') {
                success()
            }
            if (response.meta.requestStatus === 'rejected') {
                error()
            }
        }
        update()
    }

    return (
        <>
            {contextHolder}
            {isLoading ? <Loader /> : <></>}
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onSubmitCapture={handleFormSumbit}
                className='profile__form'
                style={{ color: 'var(----colors-text)' }}
            >
                <Form.Item label="New image">
                    <input
                        accept="image/jpeg,image/png,image/gif"
                        type={'file'}
                        onChange={e => handleImageChange(e)}
                    />
                </Form.Item>
                <Form.Item label="name">
                    <Input
                        value={formState?.first_name}
                        name='first_name'
                        onChange={e => handleChange(e)}
                    />
                </Form.Item>
                <Form.Item label="surname">
                    <Input
                        name="last_name"
                        value={formState?.last_name}
                        onChange={e => handleChange(e)}
                    />
                </Form.Item>
                <div className='center'>
                    <Form.Item>
                        <Button
                            htmlType='submit'
                        >
                            Update</Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}
