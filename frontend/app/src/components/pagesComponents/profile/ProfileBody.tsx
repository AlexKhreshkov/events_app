import { ProfileAds } from './ProfileAds';
import { ProfileSelectContent } from './ProfileSelectContent';

import { ProfileInfo } from '../../UI/forms/ProfileInfo';

import { useState } from 'react'

export const ProfileBody = () => {

    const [profileContentChoise, setProfileContentChoise] = useState('My profile')

    return (
        <div className='profile__body__container'>
            <div className='profile__body'>
                <div className='profile__columns'>
                    <ProfileSelectContent
                        profileContentChoise={profileContentChoise}
                        setProfileContentChoise={setProfileContentChoise}
                    />
                    <div className='profile__right__content'>
                        {profileContentChoise === 'My profile'
                            ?
                            <ProfileInfo />
                            :
                            <>
                                <div className='profile__ads__tittle'>
                                    Your ads:
                                </div>
                                <ProfileAds />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
