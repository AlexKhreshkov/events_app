import { useEffect } from 'react'
import { LostSearch } from '../components/pagesComponents/main/LostSearch'
import { PagesSubtitle } from '../components/PagesSubtitle'
import { PagesTitle } from '../components/PagesTitle'
import { RigthArea } from '../components/RigthArea'
import { EmailConfirmedSuccessModal } from '../components/UI/modal/SuccessModal/EmailConfirmedSuccessModal'
import { SuccessModal } from '../components/UI/modal/SuccessModal/SuccessModal'

export const Main = () => {

    return (
        <div className='content__container'>
            <RigthArea />
            <div className="content__body">
                <PagesTitle />
                <PagesSubtitle />
                <LostSearch />
            </div>
            <div>
                <EmailConfirmedSuccessModal />
                <SuccessModal />
            </div>
        </div>
    )
}