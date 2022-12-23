import { Select } from 'antd'
import React, { FC } from 'react'


interface ProfileSelectContentProps {
    profileContentChoise: string
    setProfileContentChoise: React.Dispatch<React.SetStateAction<string>>
}

export const ProfileSelectContent: FC<ProfileSelectContentProps> = ({ profileContentChoise, setProfileContentChoise }) => {
    return (
        <div className="profile__select__content">
            <Select
                value={profileContentChoise}
                onChange={setProfileContentChoise}
                defaultValue="My profile"
                style={{ width: 200 }}
                options={[
                    {
                        value: 'My profile',
                        label: 'My profile',
                    },
                    {
                        value: 'My ads',
                        label: 'My ads',
                    },
                ]}
            />
        </div>
    )
}
