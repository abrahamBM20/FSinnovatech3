import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { API_GATEWAY_URL } from '../config/api'

export function useProfileViewModel() {
  const { user, error, loading, updateProfile } = useAuth()
  const [profile, setProfile] = useState(user || null)
  const [username, setUsername] = useState(user?.username || '')
  const [role, setRole] = useState(user?.role || 'USER')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return

      try {
        const response = await fetch(`${API_GATEWAY_URL}/api/auth/profile/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('innovatech_token') || ''}`,
          },
        })
        if (!response.ok) return

        const data = await response.json()
        setProfile(data)
        setUsername(data.username || '')
        setRole(data.role || 'USER')
      } catch {
        setProfile(user)
        setUsername(user?.username || '')
        setRole(user?.role || 'USER')
      }
    }

    loadProfile()
  }, [user])

  async function handleSave(event) {
    event.preventDefault()
    if (!user) return

    const normalized = username.trim()
    if (!normalized) {
      setFeedback('El nombre de usuario no puede quedar vacío.')
      return
    }

    const updated = await updateProfile({ username: normalized, role })
    if (updated) {
      setFeedback('Perfil actualizado correctamente.')
      window.setTimeout(() => setFeedback(''), 3000)
    }
  }

  return {
    user: profile,
    username,
    setUsername,
    role,
    setRole,
    feedback,
    error,
    loading,
    handleSave,
  }
}
