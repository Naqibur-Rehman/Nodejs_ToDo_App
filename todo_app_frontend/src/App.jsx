import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Header from './components/Header'
import Register from './pages/Register'
import axios from 'axios'
import { Context, server } from './main'

function App() {

  const {setUser, setIsAuthenticated, setLoading} = useContext(Context)
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true)
        setLoading(false)
      }).catch((err) => {
        setUser({})
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, []);
   
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
