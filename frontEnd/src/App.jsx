import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import UpdateBlog from './components/UpdateBlog'
import CreateBlog from './components/CreateBlog'
import CreateService from './components/CreateService'
import CreateTeam from './components/CreateTeam'
import UpdateService from './components/UpdateService'
import UpdateTeam from './components/UpdateTeam'


const App = () => {
   
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/blogUpdate/:id" element={<UpdateBlog />} />
          <Route path="/serviceUpdate/:id" element={<UpdateService />} />
          <Route path="/teamUpdate/:id" element={<UpdateTeam />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App