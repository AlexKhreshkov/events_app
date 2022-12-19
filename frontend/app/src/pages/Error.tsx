import { Result } from 'antd'
import React from 'react'

export const Error = () => {
  return (
    <Result
      title={'Page not found'}
      subTitle={'404'}
      status={'404'}
    />
  )
}
