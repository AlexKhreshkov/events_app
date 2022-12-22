import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { IUser } from '../../../types/types';
import { updateUserInfo } from '../../../store/usersSlice';

const { Option } = Select;

export const ProfileInfo = () => {

    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.users.users)
    const user = users.find(user => user.id === currentUser.id)

    const [formState, setFormState] = useState<IUser>({
        id: -1,
        first_name: '',
        last_name: '',
        username: '',
        image: '',
        email: '',
        phone: '',
    })
    useEffect(() => {
        const userState = user ? {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            image: user.image,
            email: user.email,
            phone: user.phone,
        } : {
            id: -1,
            first_name: '',
            last_name: '',
            username: '',
            image: '',
            email: '',
            phone: '',
        }
        setFormState(userState)
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }
    const handleFormSumbit = () => {
        console.log(formState)
        //DELETE IMAGE TO PATCH
        // if (formState.image){
        //     delete formState.image
        // }
        async function update() {
            const response = await dispatch(updateUserInfo({ id: currentUser.id, newInfo: formState }))
        }
        update()
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onSubmitCapture={handleFormSumbit}
            className='profile__form'
        >
            <Form.Item label="New image" valuePropName="fileList">
                <Upload action="/upload.do" listType="picture-card">
                    <div>
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
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
                    <Button htmlType='submit'>Update</Button>
                </Form.Item>
            </div>
        </Form>
    )
}
