import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Header from './components/Header'
import Register from './pages/Register'

function App() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
