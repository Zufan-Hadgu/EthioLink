import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/register/register'


export default function Routing() {
  return (
    <div>
       <Routes>
         <Route path='/signup' element={<Register/>}/>
       </Routes>
    </div>
  )
}
