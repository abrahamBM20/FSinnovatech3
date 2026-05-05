import { useAuth } from '../context/AuthContext.jsx'

// Componente visual modular del encabezado.
// El Avatar circular y el botón de logout son parte de la navegación principal.
function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const initials = user?.username?.charAt(0).toUpperCase() || ''

  if (!isAuthenticated) {
    return null
  }

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: '#0a2540',
        color: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.8 }}>Innovatech Solutions</p>
        <h1 style={{ margin: '4px 0 0', fontSize: '1.2rem' }}>Portal Interno</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#1f77d0',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
          }}
          aria-label="Avatar del usuario"
        >
          {initials}
        </div>

        <button
          type="button"
          onClick={logout}
          style={{
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            cursor: 'pointer',
            background: '#ffffff',
            color: '#0a2540',
            fontWeight: 700,
          }}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
