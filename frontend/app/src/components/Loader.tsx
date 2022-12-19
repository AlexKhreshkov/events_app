import { Spin } from 'antd'

export const Loader = () => {
    //loader max z-index
    return (
        <div className="loaderContainer">
            <Spin size={'large'} />
        </div>
    )
}
