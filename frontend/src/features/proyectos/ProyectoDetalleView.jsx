import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const GATEWAY_URL = 'http://localhost:3000'

function ProyectoDetalleView({ proyectoId, onBack }) {
  const { token } = useAuth()
  const [proyecto, setProyecto] = useState(null)
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTareaForm, setShowTareaForm] = useState(false)
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    horasEstimadas: '',
  })

  useEffect(() => {
    if (proyectoId) {
      fetchProyecto()
      fetchTareas()
    }
  }, [proyectoId])

  async function fetchProyecto() {
    try {
      const response = await fetch(`${GATEWAY_URL}/api/proyectos/${proyectoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setProyecto(data.data || data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function fetchTareas() {
    try {
      const response = await fetch(`${GATEWAY_URL}/api/proyectos/${proyectoId}/tareas`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setTareas(Array.isArray(data) ? data : data.data || [])
    } finally {
      setLoading(false)
    }
  }

  async function crearTarea(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${GATEWAY_URL}/api/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...nuevaTarea,
          proyectoId: parseInt(proyectoId),
          asignadoA: 1, // Por ahora asignado al admin
        }),
      })
      if (response.ok) {
        setShowTareaForm(false)
        setNuevaTarea({ titulo: '', descripcion: '', fechaLimite: '', horasEstimadas: '' })
        fetchTareas()
        fetchProyecto() // Actualizar avance del proyecto
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function actualizarEstadoTarea(tareaId, estado) {
    try {
      await fetch(`${GATEWAY_URL}/api/tareas/${tareaId}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      })
      fetchTareas()
      fetchProyecto()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function actualizarAvance(porcentaje) {
    try {
      await fetch(`${GATEWAY_URL}/api/proyectos/${proyectoId}/avance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ porcentaje }),
      })
      fetchProyecto()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'COMPLETADA':
        return { bg: '#dcfce7', color: '#166534' }
      case 'EN_PROGRESO':
        return { bg: '#dbeafe', color: '#1d4ed8' }
      default:
        return { bg: '#fef3c7', color: '#92400e' }
    }
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>
  }

  if (!proyecto) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Proyecto no encontrado</div>
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Botón volver */}
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          color: '#0a2540',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        ← Volver a proyectos
      </button>

      {/* Header del proyecto */}
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', color: '#0a2540', marginBottom: '8px' }}>
              {proyecto.nombre}
            </h1>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>{proyecto.descripcion}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span
                style={{
                  background: '#e2e8f0',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                }}
              >
                {proyecto.tipo}
              </span>
              <span
                style={{
                  background:
                    proyecto.estado === 'ACTIVO'
                      ? '#dbeafe'
                      : proyecto.estado === 'COMPLETADO'
                      ? '#dcfce7'
                      : '#fef3c7',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                }}
              >
                {proyecto.estado}
              </span>
            </div>
          </div>

          {/* Control de avance */}
          <div style={{ textAlign: 'center', minWidth: '150px' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
              Avance del proyecto
            </div>
            <div
              style={{
                width: '120px',
                height: '10px',
                background: '#e2e8f0',
                borderRadius: '5px',
                overflow: 'hidden',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  width: `${proyecto.porcentajeAvance || 0}%`,
                  height: '100%',
                  background: '#3b82f6',
                }}
              />
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a2540' }}>
              {proyecto.porcentajeAvance || 0}%
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={proyecto.porcentajeAvance || 0}
              onChange={(e) => actualizarAvance(parseInt(e.target.value))}
              style={{ marginTop: '12px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Sección de tareas */}
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#0a2540' }}>📋 Tareas del proyecto</h2>
          <button
            onClick={() => setShowTareaForm(!showTareaForm)}
            style={{
              background: '#0a2540',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '40px',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            + Nueva tarea
          </button>
        </div>

        {/* Formulario nueva tarea */}
        {showTareaForm && (
          <form
            onSubmit={crearTarea}
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Agregar tarea</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              <input
                type="text"
                placeholder="Título de la tarea"
                value={nuevaTarea.titulo}
                onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                style={{ padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                required
              />
              <textarea
                placeholder="Descripción"
                value={nuevaTarea.descripcion}
                onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                style={{ padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                rows="2"
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="date"
                  placeholder="Fecha límite"
                  value={nuevaTarea.fechaLimite}
                  onChange={(e) => setNuevaTarea({ ...nuevaTarea, fechaLimite: e.target.value })}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
                <input
                  type="number"
                  placeholder="Horas estimadas"
                  value={nuevaTarea.horasEstimadas}
                  onChange={(e) => setNuevaTarea({ ...nuevaTarea, horasEstimadas: e.target.value })}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: '#0a2540',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                Crear tarea
              </button>
            </div>
          </form>
        )}

        {/* Lista de tareas */}
        {tareas.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
            No hay tareas en este proyecto. ¡Crea una!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tareas.map((tarea) => {
              const estadoStyle = getEstadoColor(tarea.estado)
              return (
                <div
                  key={tarea.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${estadoStyle.color}`,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{tarea.titulo}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {tarea.descripcion}
                    </div>
                    {tarea.horasEstimadas && (
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
                        ⏱️ {tarea.horasEstimadas} horas estimadas
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <select
                      value={tarea.estado}
                      onChange={(e) => actualizarEstadoTarea(tarea.id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: 'none',
                        background: estadoStyle.bg,
                        color: estadoStyle.color,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="EN_PROGRESO">En progreso</option>
                      <option value="COMPLETADA">Completada</option>
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

export default ProyectoDetalleView