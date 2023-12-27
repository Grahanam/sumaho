import { useState } from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import './App.css'
import Sumaho from './hocs/Sumaho'

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path='/*' element={<Sumaho/>}/>
       </Routes>
     </BrowserRouter> 
  )
}

export default App
