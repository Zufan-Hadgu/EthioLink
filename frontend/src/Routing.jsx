import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/register/register'
import Explore from './pages/ventureReel/VentureReel'
import BusinessOnboarding from './pages/buissness/Buisseness'

export default function Routing() {
  return (
    <div>
       <Routes>
         <Route path='/signup' element={<Register/>}/>
          <Route path='/reel' element={<Explore/>}/>
         <Route path='/buissness' element={<BusinessOnboarding/>}/> 
       </Routes>
    </div>
  )
}
