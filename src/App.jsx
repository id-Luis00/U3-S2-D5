import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import DetailsWeather from './components/DetailsWeather'
import { Button, Offcanvas } from 'react-bootstrap'
import { useState } from 'react'
import NavigationMenu from './components/NavigationMenu'


function App() {

  

  return (



    <BrowserRouter>


     <NavigationMenu />
        


        <Routes>

          {/* <Home /> */}
          <Route path='/' element={<Home />} />
          <Route path='/details' element={<DetailsWeather />} />


        </Routes>
     

    </BrowserRouter>

  )
}

export default App
