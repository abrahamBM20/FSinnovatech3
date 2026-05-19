import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import KPICards from './KPICards'
import TareasList from './TareasList'

const GATEWAY_URL = 'http://localhost:3000'

function Dashboard() {
  const { token } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [proyectos, setProyectos] = useState([])
  const [tareasRecientes, setTareasRecientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    setLoading(true)
    try {
      const [dashboardRes, proyectosRes, tareasRes] = await Promise.all([
        fetch(`${GATEWAY_URL}/api/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${GATEWAY_URL}/api/proyectos`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${GATEWAY_URL}/api/proyectos/1/tareas`, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({ json: () => [] })),
      ])

      const dashboardData = await dashboardRes.json()
      const proyectosData = await proyectosRes.json()
      let tareasData = []
      try {
        tareasData = await tareasRes.json()
      } catch {
        tareasData = []
      }

      setDashboard(dashboardData.data || dashboardData)
      setProyectos(Array.isArray(proyectosData) ? proyectosData : proyectosData.data || [])
      setTareasRecientes(Array.isArray(tareasData) ? tareasData.slice(0, 5) : [])
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
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
      fetchDashboardData()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const tabs = [
    { id: 'overview', label: '📊 Resumen General', icon: '📊' },
    { id: 'proyectos', label: '📁 Proyectos', icon: '📁' },
    { id: 'tareas', label: '✅ Mis Tareas', icon: '✅' },
  ]

  return (
    <div>
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '8px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 24px',
              border: 'none',
              background: activeTab === tab.id ? '#0a2540' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#64748b',
              borderRadius: '40px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Overview */}
      {activeTab === 'overview' && (
        <>
          <KPICards data={dashboard} loading={loading} />

          {/* Proyectos destacados */}
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              marginTop: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#0a2540' }}>
              🚀 Proyectos Destacados
            </h2>
            {loading ? (
              <div>Cargando...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {proyectos.slice(0, 4).map((proyecto) => (
                  <div
                    key={proyecto.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{proyecto.nombre}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '100px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${proyecto.porcentajeAvance || 0}%`,
                            height: '100%',
                            background: '#3b82f6',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.85rem', minWidth: '45px' }}>
                        {proyecto.porcentajeAvance || 0}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Tab Proyectos */}
      {activeTab === 'proyectos' && (
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#0a2540' }}>
            Lista de Proyectos
          </h2>
          {loading ? (
            <div>Cargando...</div>
          ) : proyectos.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
              No hay proyectos creados
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {proyectos.map((proyecto) => (
                <div
                  key={proyecto.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{proyecto.nombre}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{proyecto.tipo}</div>
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      background:
                        proyecto.estado === 'ACTIVO'
                          ? '#dbeafe'
                          : proyecto.estado === 'COMPLETADO'
                          ? '#dcfce7'
                          : '#fef3c7',
                    }}
                  >
                    {proyecto.estado}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Tareas */}
      {activeTab === 'tareas' && (
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#0a2540' }}>
            Mis Tareas Recientes
          </h2>
          <TareasList
            tareas={tareasRecientes}
            onEstadoChange={actualizarEstadoTarea}
            loading={loading}
          />
        </div>
      )}
    </div>
  )
}

export default Dashboard