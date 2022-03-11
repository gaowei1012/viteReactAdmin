import React from 'react'
import { Result } from 'antd'

const Failure: React.FC<any> = () => {
  return <Result status='error' title='token失效或者链接失效' subTitle='token失效或者链接失效，请检查是否在有效期内，或者重新发送邀请!' />
}

export default Failure
