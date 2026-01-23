import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/login'
import Register from './components/auth/register'
import ContactSection from './components/ContactSection'
import { PageNotFound } from './components/Dashboard'
import Layout from './components/Dashboard/Layout'
import Footer from './components/footer'
import Home from './components/home'
import About from './components/home/about'
import SmartFeatures from './components/home/SmartFeatures'
import Navbar from './components/Navbar'
import ScanPage from './components/sacn'
import { Profile } from './components/user-pages'
import { useAuth } from './providers/userProvider'

function App() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <Layout>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    )
  }

  return (
    <>
      <Navbar />
      <Routes >
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<SmartFeatures />} />
        <Route path='/contact' element={<ContactSection />} />
        <Route path='/scan' element={<ScanPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
