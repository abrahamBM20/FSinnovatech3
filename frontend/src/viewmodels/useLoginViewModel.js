import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function useLoginViewModel() {
  const { login, error, loading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    await login(username.trim(), password)
  }

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    error,
    loading,
  }
}
