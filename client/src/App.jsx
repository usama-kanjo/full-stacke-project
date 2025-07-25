import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Singup from './pages/Signup.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'



axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.withCredentials = true


function App() {

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default App
