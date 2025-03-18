import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Candidates from './pages/Candidates'
import Internships from './pages/Internships'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/layout/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

// Import Firebase
import app from './services/firebase'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/candidates" element={
            <ProtectedRoute>
              <Layout>
                <Candidates />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/internships" element={
            <ProtectedRoute>
              <Layout>
                <Internships />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/competitions" element={
            <ProtectedRoute>
              <Layout>
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Competition Management</h1>
                  <p className="text-gray-600 dark:text-gray-400">Competition management features coming soon.</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics & Reports</h1>
                  <p className="text-gray-600 dark:text-gray-400">Analytics features coming soon.</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/communication" element={
            <ProtectedRoute>
              <Layout>
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Communication Center</h1>
                  <p className="text-gray-600 dark:text-gray-400">Communication features coming soon.</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <div className="animate-fade-in">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
                  <p className="text-gray-600 dark:text-gray-400">Settings features coming soon.</p>
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/logout" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
