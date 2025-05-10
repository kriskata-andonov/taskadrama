import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'

import './App.css'

import Navbar from './components/Navbar'

import { AuthProvider, useAuth } from './context/AuthContext'

function ProtectedRoute({ element }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return element
}

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <Navbar />

            <Routes>
              <Route path="/" element={<ProtectedRoute element={<TasksPage />} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/tasks' element={<ProtectedRoute element={<TasksPage />} />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
