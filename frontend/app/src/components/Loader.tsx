import { Spin } from 'antd'

export const Loader = () => {
    return (
        <div className="loaderContainer">
            <Spin size={'large'} />
        </div>
    )
}
