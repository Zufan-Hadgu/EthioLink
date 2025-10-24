import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/register/register'
import LoginPage from './pages/login/LoginPage'
import ProfileDetailsPage from './pages/profile/UserProfile'
import SupportPage from './pages/crowdfund/FundPage'
import Explore from './pages/ventureReel/VentureReel'
import BusinessOnboarding from './pages/buissness/Buisseness'
import Dashboard from './pages/dashboard/Dashabord'
import ProductDetail from './pages/dashboard/ProductDetail'

export default function Routing() {
  return (
    <Routes>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/reel' element={<Explore/>}/>
      <Route path='/biussness' element={<BusinessOnboarding/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path='/profile' element={<ProfileDetailsPage/>}/>
      <Route path='/fund' element={<SupportPage/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
    </Routes>
  )
}
