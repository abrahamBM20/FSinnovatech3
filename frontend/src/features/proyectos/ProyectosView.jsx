import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const GATEWAY_URL = 'http://localhost:3000'

function ProyectosView() {
  const { token } = useAuth()
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'AGIL',
    responsableId: 1,
  })

  useEffect(() => {
    fetchProyectos()
  }, [])

  async function fetchProyectos() {
    try {
      const response = await fetch(`${GATEWAY_URL}/api/proyectos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setProyectos(Array.isArray(data) ? data : data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function crearProyecto(e) {
    e.preventDefault()
    try {
      const response = await fetch(`${GATEWAY_URL}/api/proyectos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setShowForm(false)
        fetchProyectos()
        setFormData({ nombre: '', descripcion: '', tipo: 'AGIL', responsableId: 1 })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function actualizarAvance(id, porcentaje) {
    try {
      await fetch(`${GATEWAY_URL}/api/proyectos/${id}/avance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ porcentaje }),
      })
      fetchProyectos()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando proyectos...</div>
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: '#0a2540' }}>Gestión de Proyectos</h1>
          <p style={{ color: '#64748b' }}>Administra y da seguimiento a tus proyectos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#0a2540',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '40px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          + Nuevo Proyecto
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>Crear Nuevo Proyecto</h2>
          <form onSubmit={crearProyecto} style={{ display: 'grid', gap: '16px' }}>
            <input
              type="text"
              placeholder="Nombre del proyecto"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
              required
            />
            <textarea
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
              rows="3"
            />
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1' }}
            >
              <option value="AGIL">Ágil</option>
              <option value="TRADICIONAL">Tradicional</option>
              <option value="HIBRIDO">Híbrido</option>
            </select>
            <button
              type="submit"
              style={{
                background: '#0a2540',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Crear Proyecto
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h3 style={{ margin: '0 0 8px', color: '#0a2540' }}>{proyecto.nombre}</h3>
                <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.9rem' }}>
                  {proyecto.descripcion}
                </p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
                  <span style={{ background: '#e2e8f0', padding: '4px 12px', borderRadius: '20px' }}>
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
                    }}
                  >
                    {proyecto.estado}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Avance</div>
                <div
                  style={{
                    width: '100px',
                    height: '8px',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden',
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
                <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                  {proyecto.porcentajeAvance || 0}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ProyectosView