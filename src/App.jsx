import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DetailsWeather from './components/DetailsWeather'


function App() {


  return (


    <BrowserRouter>
    
    <>
    <Routes>

      {/* <Home /> */}
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<DetailsWeather />} /> 


    </Routes>
    </>

    </BrowserRouter>

  )
}

export default App
