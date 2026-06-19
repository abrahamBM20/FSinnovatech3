import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { API_GATEWAY_URL } from '../config/api'
const FALLBACK_DASHBOARD = {
  total_proyectos: 12,
  proyectos_activos: 7,
  proyectos_completados: 4,
  avance_promedio: 63,
  utilizacion_recursos: 78,
  tareas_pendientes: 18,
  tareas_completadas_hoy: 9,
}
const FALLBACK_PROJECTS = [
  { id: 1, nombre: 'Portal comercial', tipo: 'AGIL', estado: 'ACTIVO', porcentajeAvance: 74 },
  { id: 2, nombre: 'Migración de usuarios', tipo: 'TRADICIONAL', estado: 'COMPLETADO', porcentajeAvance: 100 },
  { id: 3, nombre: 'Analítica ejecutiva', tipo: 'HIBRIDO', estado: 'PLANIFICACION', porcentajeAvance: 28 },
  { id: 4, nombre: 'Operación interna', tipo: 'AGIL', estado: 'ACTIVO', porcentajeAvance: 56 },
]

export function useDashboardViewModel() {
  const { token } = useAuth()
  const [dashboard, setDashboard] = useState(FALLBACK_DASHBOARD)
  const [proyectos, setProyectos] = useState(FALLBACK_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [online, setOnline] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setError('')

    try {
      const [dashboardResponse, proyectosResponse] = await Promise.all([
        fetch(`${API_GATEWAY_URL}/api/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_GATEWAY_URL}/api/proyectos`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const dashboardData = await dashboardResponse.json().catch(() => ({}))
      const proyectosData = await proyectosResponse.json().catch(() => [])

      setDashboard(dashboardData.data || dashboardData || FALLBACK_DASHBOARD)
      setProyectos(Array.isArray(proyectosData) ? proyectosData : proyectosData.data || FALLBACK_PROJECTS)
      setOnline(true)
    } catch {
      setDashboard(FALLBACK_DASHBOARD)
      setProyectos(FALLBACK_PROJECTS)
      setOnline(false)
      setError('El backend no respondió; la vista muestra datos de respaldo.')
    } finally {
      setLoading(false)
    }
  }

  return {
    dashboard,
    proyectos,
    loading,
    error,
    online,
    sourceLabel: online ? 'Datos sincronizados' : 'Modo demostración',
    refresh: load,
  }
}
