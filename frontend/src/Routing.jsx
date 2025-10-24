import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/register/register'
import LoginPage from './pages/login/LoginPage'
import ProfileDetailsPage from './pages/profile/UserProfile'
import SupportPage from './pages/crowdfund/FundPage'


export default function Routing() {
  return (
    <div>
       <Routes>
         <Route path='/signup' element={<Register/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path='/profile' element={<ProfileDetailsPage/>}/>
         <Route path='/fund' element={<SupportPage/>}/>
       </Routes>
    </div>
  )
}
