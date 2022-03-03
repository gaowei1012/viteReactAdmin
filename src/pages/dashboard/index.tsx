import React from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/useStore'

const Dashboard = observer(() => {
  const { loadingInstance } = useStore()
  return <div>observer</div>
})

export default Dashboard
