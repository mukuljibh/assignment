import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import axios from 'axios'

import Footer from './components/footer/Footer';
import Navbar from './components/nav-bar/Navbar';
const AuthPage = lazy(() => import("./components/login-page/AuthPage"))
const EditProfilePage = lazy(() => import("./components/edit-profile/EditProfilePage"))
const Homepage = lazy(() => import("./components/homepage/Homepage"))


axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={"<h1>Loading...</h1>"}>
        <Routes>
          <Route path="/*" element={<AuthPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
