import { CreateAd } from '../components/UI/forms/CreateAd'

export const CreateNewAdd = () => {

    return (
        <div className='createAd__container'>
            <div className='createAd'>
                <div className='createAd__title'>
                    <h1>Create your ad</h1>
                </div>
                <div className='createAd__body'>
                    <CreateAd />
                </div>
            </div>
        </div>
    )
}
