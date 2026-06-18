import { useEffect, useState } from 'react'

export function useNavigation(initialView = 'dashboard') {
  const [currentView, setCurrentView] = useState(initialView)

  useEffect(() => {
    const handleNavigate = (event) => setCurrentView(event.detail)
    window.addEventListener('navigate', handleNavigate)
    return () => window.removeEventListener('navigate', handleNavigate)
  }, [])

  function navigateTo(view) {
    setCurrentView(view)
  }

  return { currentView, navigateTo }
}
