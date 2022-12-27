import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    message,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { adInfoForm, IAd } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { fetchAds } from '../../../store/adsSlice';
import { updateUserInfo } from '../../../store/usersSlice';
import axios from 'axios';
import { ADS_URL } from '../../../utils/constants';
import { getTokenFromLocalStorage } from '../../../utils/utils';

const { TextArea } = Input;

interface userProfileInfo {
    first_name: string
    last_name: string
    phone: string
}

interface IAdResponseFieldsError {
    title: string[],
    category: string[],
    user: string[],
    text: string[]
}

export const CreateAd = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const categories = useAppSelector(state => state.categories.categories)
    const currentUser = useAppSelector(state => state.user.currentUser)
    const users = useAppSelector(state => state.users.users)
    const user = users.find(user => user.id === currentUser.id)
    const [adInfoForm, setAdInfoForm] = useState<adInfoForm>({ category: 1, text: '', title: '' })
    const [userProfileInfo, setUserProfileInfo] = useState<userProfileInfo>()
    const [createAdErr, setCreateAdErr] = useState<IAdResponseFieldsError>()

    useEffect(() => {
        if (user) {
            setUserProfileInfo({ first_name: user.first_name, last_name: user.last_name, phone: user.phone })
        }
    }, [])

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdInfoForm({ ...adInfoForm, title: e.target.value })
    }

    const error = () => {
        messageApi.open({
            type: 'error',
            content: `Failed to create ad`
        });
    };
    async function sumbitFormHandler() {
        const authToken = getTokenFromLocalStorage()
        try {
            await axios.post<IAd>(
                `${ADS_URL}create/`,
                { ...adInfoForm, user: currentUser.id },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': `Token ${authToken}`,
                    },
                }
            )
            await dispatch(fetchAds())
            setAdInfoForm({ text: '', category: 1, title: '' })
            if (userProfileInfo) {
                dispatch(updateUserInfo({ id: currentUser.id, newInfo: userProfileInfo }))
            }
            navigate('/')
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                setCreateAdErr(err.response?.data)
                error()
            }
        }
    }

    return (
        <>
            {contextHolder}
            {user && currentUser.username && userProfileInfo
                ?
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={() => sumbitFormHandler()}
                >
                    <Form.Item
                        label='Title'
                    >
                        <Input
                            name="title"
                            value={adInfoForm.title}
                            onChange={e => titleHandler(e)}
                            status={createAdErr?.title ? 'error' : ''}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                    >
                        <Select
                            defaultValue={1}
                            onSelect={catId => setAdInfoForm({ ...adInfoForm, category: catId })}
                            status={createAdErr?.category ? 'error' : ''}
                        >
                            {categories.map(cat =>
                                <Select.Option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.name}
                                </Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                    >
                        <TextArea
                            name='text'
                            value={adInfoForm.text}
                            onChange={e => setAdInfoForm({ ...adInfoForm, text: e.target.value })}
                            status={createAdErr?.text ? 'error' : ''}
                            rows={4}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                    >
                        <Input
                            name="last_name"
                            value={userProfileInfo.first_name}
                            onChange={e => setUserProfileInfo({ ...userProfileInfo, first_name: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Surname"
                    >
                        <Input
                            name="last_name"
                            value={userProfileInfo.last_name}
                            onChange={e => setUserProfileInfo({ ...userProfileInfo, last_name: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Your phone"
                    >
                        <Input
                            name='phone'
                            value={userProfileInfo.phone}
                            onChange={e => setUserProfileInfo({ ...userProfileInfo, phone: e.target.value })}
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList">
                        <Upload
                            beforeUpload={() => false}
                            onChange={e => setAdInfoForm({ ...adInfoForm, image: e.file })}
                            listType="picture-card"
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item className='center'>
                        <Button
                            htmlType={'submit'}
                        >
                            CREATE
                        </Button>
                    </Form.Item>
                </Form>
                :
                <div>Error</div>
            }
        </>
    );
};
