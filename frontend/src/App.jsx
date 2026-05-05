import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import LoginView from './features/auth/LoginView.jsx'
import ProfileView from './features/profile/ProfileView.jsx'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <div style={{ minHeight: '100vh', background: '#e9edf3' }}>
      <Navbar />
      {isAuthenticated ? <ProfileView /> : <LoginView />}
    </div>
  )
}

// App.jsx es el orquestador principal.
// Protege la vista de perfil mostrando Login cuando no hay sesión.
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
