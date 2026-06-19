import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function useProfileViewModel() {
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

    if (normalized === user.username) {
      setFeedback('No se detectaron cambios.')
      return
    }

    const updated = await updateUsername(normalized)
    if (updated) {
      setFeedback('Username actualizado correctamente.')
      window.setTimeout(() => setFeedback(''), 3000)
    }
  }

  return {
    user,
    username,
    setUsername,
    feedback,
    error,
    loading,
    handleSave,
  }
}
