import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const initials = user?.username?.charAt(0).toUpperCase() || ''

  if (!isAuthenticated) return null

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', view: 'dashboard' },
    { id: 'proyectos', label: '📁 Proyectos', view: 'proyectos' },
    { id: 'perfil', label: '👤 Mi Perfil', view: 'perfil' },
  ]

  // Notificar cambio de vista
  const handleTabChange = (view) => {
    setActiveTab(view)
    window.dispatchEvent(new CustomEvent('navigate', { detail: view }))
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#0a2540',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 32px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Logo y empresa */}
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7, letterSpacing: '1px' }}>
            INNOVATECH SOLUTIONS
          </p>
          <h1 style={{ margin: '2px 0 0', fontSize: '1.25rem', fontWeight: 600 }}>
            Portal de Gestión
          </h1>
        </div>

        {/* Tabs de navegación */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.view)}
              style={{
                padding: '8px 20px',
                borderRadius: '40px',
                border: 'none',
                background: activeTab === tab.view ? '#ffffff' : 'transparent',
                color: activeTab === tab.view ? '#0a2540' : '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.9rem',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Avatar y logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1f77d0, #0a5ba0)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            {initials}
          </div>
          <button
            onClick={logout}
            style={{
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#ffffff20')}
            onMouseLeave={(e) => (e.target.style.background = 'transparent')}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar