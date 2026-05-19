import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginView from './features/auth/LoginView'
import ProfileView from './features/profile/ProfileView'
import DashboardView from './features/analytics/DashboardView'
import ProyectosView from './features/proyectos/ProyectosView'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    const handleNavigate = (e) => {
      setCurrentView(e.detail)
    }
    window.addEventListener('navigate', handleNavigate)
    return () => window.removeEventListener('navigate', handleNavigate)
  }, [])

  if (!isAuthenticated) {
    return <LoginView />
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />
      case 'proyectos':
        return <ProyectosView />
      case 'perfil':
        return <ProfileView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar />
      {renderView()}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App