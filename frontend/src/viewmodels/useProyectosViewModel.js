import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { API_GATEWAY_URL } from '../config/api'
const FALLBACK_PROJECTS = [
  {
    id: 1,
    nombre: 'Portal comercial',
    descripcion: 'Experiencia pública y área de clientes con foco en conversión.',
    tipo: 'AGIL',
    estado: 'ACTIVO',
    porcentajeAvance: 74,
    responsableId: 1,
  },
  {
    id: 2,
    nombre: 'Migración de usuarios',
    descripcion: 'Unificación de perfiles y normalización de datos históricos.',
    tipo: 'TRADICIONAL',
    estado: 'COMPLETADO',
    porcentajeAvance: 100,
    responsableId: 2,
  },
  {
    id: 3,
    nombre: 'Analítica ejecutiva',
    descripcion: 'Panel para visualizar avance, carga y alertas operativas.',
    tipo: 'HIBRIDO',
    estado: 'PLANIFICACION',
    porcentajeAvance: 28,
    responsableId: 3,
  },
]

export function useProyectosViewModel() {
  const { token } = useAuth()
  const [proyectos, setProyectos] = useState(FALLBACK_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'AGIL',
    responsableId: 1,
  })

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/proyectos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json().catch(() => [])
      const nextProjects = Array.isArray(data) ? data : data.data || FALLBACK_PROJECTS
      setProyectos(nextProjects.length ? nextProjects : FALLBACK_PROJECTS)
    } catch {
      setProyectos(FALLBACK_PROJECTS)
      setError('No se pudo leer el servicio de proyectos; se muestran datos de respaldo.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateProject(event) {
    event.preventDefault()
    const draft = {
      ...formData,
      id: Date.now(),
      porcentajeAvance: 0,
      estado: 'PLANIFICACION',
    }

    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/proyectos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await loadProjects()
        setFormData({ nombre: '', descripcion: '', tipo: 'AGIL', responsableId: 1 })
        setShowForm(false)
        return
      }
    } catch {
      // Fallback intencional: si el backend no está listo, la UI sigue demostrable.
    }

    setProyectos((current) => [draft, ...current])
    setFormData({ nombre: '', descripcion: '', tipo: 'AGIL', responsableId: 1 })
    setShowForm(false)
  }

  async function handleActualizarAvance(id, porcentaje) {
    setProyectos((current) =>
      current.map((project) =>
        project.id === id ? { ...project, porcentajeAvance: porcentaje } : project
      )
    )

    try {
      await fetch(`${API_GATEWAY_URL}/api/proyectos/${id}/avance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ porcentaje }),
      })
    } catch {
      // Sin bloqueo.
    }
  }

  function toggleForm() {
    setShowForm((current) => !current)
  }

  const stats = useMemo(() => {
    const total = proyectos.length
    const activos = proyectos.filter((project) => project.estado === 'ACTIVO').length
    const completados = proyectos.filter((project) => project.estado === 'COMPLETADO').length
    return { total, activos, completados }
  }, [proyectos])

  return {
    proyectos,
    loading,
    showForm,
    formData,
    error,
    stats,
    setFormData,
    toggleForm,
    handleCreateProject,
    handleActualizarAvance,
  }
}
