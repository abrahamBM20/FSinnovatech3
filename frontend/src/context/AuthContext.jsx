import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { API_GATEWAY_URL } from '../config/api'

const AuthContext = createContext(null)

const STORAGE_KEYS = {
  token: 'innovatech_token',
  user: 'innovatech_user',
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.user)
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.token) || ''
    } catch {
      return ''
    }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.token, token)
    } else {
      localStorage.removeItem(STORAGE_KEYS.token)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.user)
    }
  }, [user])

  const isAuthenticated = Boolean(token && user)

  async function login(username, password) {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || 'Credenciales inválidas')
      }

      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
      return true
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
      setToken('')
      setUser(null)
      return false
    } finally {
      setLoading(false)
    }
  }

  async function updateUsername(newUsername) {
    if (!user || !token) {
      setError('No hay usuario autenticado')
      return false
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/auth/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUsername),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.message || 'No se pudo actualizar el perfil')
      }

      const updated = await response.json()
      setUser((current) => ({ ...current, username: updated.username }))
      return true
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil')
      return false
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken('')
    setError('')
    setLoading(false)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      error,
      loading,
      isAuthenticated,
      login,
      logout,
      updateUsername,
    }),
    [error, isAuthenticated, loading, token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}

export { AuthProvider, useAuth }