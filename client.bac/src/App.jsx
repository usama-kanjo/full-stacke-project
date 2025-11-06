import 'bootstrap/dist/css/bootstrap.min.css'
import Singup from './pages/Signup.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import VerifyEmail from './pages/VerifyEmail';
import ResendVerification from './pages/ResendVerification';
import Profile from './pages/profile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext';
import UserHome from './pages/UserHome';
import Settings from './pages/Settings.jsx';
import MainLayout from './layouts/MainLayout';
import NoLayout from './layouts/NoLayout';



axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true


function App() {

  return (
    <>
      <AuthProvider>
        {/* <Navbar /> */}
        <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Navbar OLAN sayfalar */}
          <Route element={<MainLayout />}>

            <Route path="/user/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/user/home" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
            <Route path="/user/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/" element={<Home />} />
          </Route>
          {/* Navbar OLMAYAN sayfalar */}
          <Route element={<NoLayout />}>

            <Route path="/register" element={<Singup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
