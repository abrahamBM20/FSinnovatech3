import { useAuth } from '../context/AuthContext'

export function usePortalShell() {
  const { user, logout } = useAuth()

  return {
    user,
    logout,
    companyName: 'Innovatech Solutions',
    portalName: 'Portal Ejecutivo',
    subtitle: 'Seguimiento de proyectos, analítica y perfil de usuario',
  }
}
