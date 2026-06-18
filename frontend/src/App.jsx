import { AuthProvider, useAuth } from './context/AuthContext'
import PortalLayout from './components/PortalLayout'
import LoginView from './features/auth/LoginView'
import ProfileView from './features/profile/ProfileView'
import DashboardView from './features/analytics/DashboardView'
import ProyectosView from './features/proyectos/ProyectosView'
import { useNavigation } from './viewmodels/useNavigation'
import { usePortalShell } from './viewmodels/usePortalShell'

function AppContent() {
  const { isAuthenticated } = useAuth()
  const { currentView, navigateTo } = useNavigation('dashboard')
  const shell = usePortalShell()

  if (!isAuthenticated) {
    return <LoginView />
  }

  return (
    <PortalLayout shell={shell} currentView={currentView} onNavigate={navigateTo}>
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'proyectos' && <ProyectosView />}
      {currentView === 'perfil' && <ProfileView />}
    </PortalLayout>
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