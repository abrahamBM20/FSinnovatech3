import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

// Vista de Perfil de Usuario. Consume el ViewModel de AuthContext
// para renderizar el Modelo de datos y permitir la edición del username.
function ProfileView() {
  const { user, error, loading, updateUsername } = useAuth()
  const [username, setUsername] = useState(user?.username || '')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setUsername(user?.username || '')
  }, [user])


  async function handleSave(event) {
    event.preventDefault()
    if (!user) return

    const normalized = username.trim()
    if (!normalized) {
      setFeedback('El nombre de usuario no puede quedar vacío.')
      return
    }

    const changed = normalized !== user.username
    if (!changed) {
      setFeedback('No se detectaron cambios en el username.')
      return
    }

    const updated = await updateUsername(normalized)
    if (updated) {
      setFeedback('Username actualizado correctamente.')
      window.setTimeout(() => setFeedback(''), 3000)
    }
  }

  if (!user) {
    return null
  }

  return (
    <main style={{ padding: '28px 24px', maxWidth: '760px', margin: '0 auto' }}>
      <section
        style={{
          background: '#ffffff',
          borderRadius: '22px',
          padding: '28px',
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
        }}
      >
        <h2 style={{ margin: '0 0 12px', color: '#0a2540' }}>Perfil de Usuario</h2>
        <p style={{ margin: '0 0 24px', color: '#475569' }}>
          Aquí puedes revisar tus datos y actualizar tu username dentro del portal.
        </p>

        <div style={{ display: 'grid', gap: '14px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <strong>ID de usuario:</strong>
            <span>{user.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <strong>Usuario actual:</strong>
            <span>{user.username}</span>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <label style={{ display: 'block', marginBottom: '14px', color: '#334155' }}>
            Nuevo username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              style={{
                width: '100%',
                marginTop: '10px',
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
                marginBottom: '16px',
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#fee2e2',
                color: '#991b1b',
              }}
            >
              {error}
            </div>
          )}

          {feedback && (
            <div
              style={{
                marginBottom: '16px',
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#e0f2fe',
                color: '#0369a1',
              }}
            >
              {feedback}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              border: 'none',
              borderRadius: '14px',
              padding: '14px 20px',
              background: '#0a2540',
              color: '#fff',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Guardando...' : 'Actualizar username'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default ProfileView
