import { useState } from 'react'
import { ProfileInfo } from '../../UI/forms/ProfileInfo';
import { ProfileAds } from './ProfileAds';
import { ProfileSelectContent } from './ProfileSelectContent';

export const ProfileBody = () => {


    const [profileContentChoise, setProfileContentChoise] = useState('Acds')

    return (
        <div className="profile__body__container">
            <div className="profile__body">
                <div className="profile__columns">
                    <ProfileSelectContent
                        profileContentChoise={profileContentChoise}
                        setProfileContentChoise={setProfileContentChoise}
                    />
                    <div className="profile__right__content">
                        {profileContentChoise === 'Ads'
                            ?
                            <>
                                <div className="profile__ads__tittle">
                                    Your ads:
                                </div>
                                <ProfileAds />
                            </>
                            :
                            <ProfileInfo/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
