import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './container/DefaultLayout'
import Dashboard from './pages/dashboard'
import Home from './pages/home'

import './styles/base.scss'
import './styles/app.scss'
import Login from './pages/login'
import Register from './pages/register'

const App: React.FC<any> = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
