import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

// Vista de Login que consume AuthContext como ViewModel.
// Separa la UI de la lógica de autenticación para cumplir MVVM.
function LoginView() {
  const { login, error, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    await login(username.trim(), password)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        background: '#f4f5f7',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '18px',
          padding: '32px',
          background: '#ffffff',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
        }}
      >
        <h2 style={{ margin: '0 0 16px', color: '#0a2540' }}>Iniciar sesión</h2>
        <p style={{ margin: '0 0 24px', color: '#475569' }}>
          Ingresa tu usuario y contraseña para acceder al portal de Innovatech.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '12px', color: '#334155' }}>
            Usuario
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
              }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '20px', color: '#334155' }}>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
              }}
            />
          </label>

          {error && (
            <div
              style={{
                marginBottom: '18px',
                padding: '12px 14px',
                background: '#fee2e2',
                color: '#991b1b',
                borderRadius: '12px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '14px',
              border: 'none',
              background: '#0a2540',
              color: '#fff',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Validando...' : 'Entrar'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginView
