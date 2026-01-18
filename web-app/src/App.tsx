
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer'
import Home from './components/home'
import Navbar from './components/Navbar'
import About from './components/home/about'
import SmartFeatures from './components/home/SmartFeatures'
import ContactSection from './components/ContactSection'
import ScanPage from './components/sacn'
import Login from './components/auth/login'
import Register from './components/auth/register'

function App() {


  return (
    <>
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<SmartFeatures />} />
        <Route path='/contact' element={<ContactSection />} />
        <Route path='/scan' element={<ScanPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
