import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Login'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/hp" element={<LandingPage/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
