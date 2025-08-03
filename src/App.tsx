import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Login'
import { BookList } from './pages/BookList'
import { AddBook } from './pages/AddBook'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/hp" element={<LandingPage/>}/>
    <Route path="/books" element={<BookList/>}/>
    <Route path="/add-book" element={<AddBook/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
