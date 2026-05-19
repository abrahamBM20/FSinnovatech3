import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import KPICards from '../../components/KPICards'

const GATEWAY_URL = 'http://localhost:3000'

function DashboardView() {
  const { token } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  async function fetchDashboard() {
    setLoading(true)
    try {
      const [dashboardRes, proyectosRes] = await Promise.all([
        fetch(`${GATEWAY_URL}/api/analytics/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${GATEWAY_URL}/api/proyectos`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const dashboardData = await dashboardRes.json()
      const proyectosData = await proyectosRes.json()

      setDashboard(dashboardData.data || dashboardData)
      setProyectos(Array.isArray(proyectosData) ? proyectosData : proyectosData.data || [])
    } catch (err) {
      setError('Error al cargar el dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
        ⚠️ {error}
      </div>
    )
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '1.75rem', color: '#0a2540', marginBottom: '8px' }}>
        Dashboard Ejecutivo
      </h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>
        KPIs y métricas en tiempo real de Innovatech Solutions
      </p>

      <KPICards data={dashboard} loading={loading} />

      {/* Sección de proyectos recientes */}
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0a2540' }}>
          📋 Proyectos Recientes
        </h2>
        {loading ? (
          <div>Cargando proyectos...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {proyectos.slice(0, 5).map((proyecto) => (
              <div
                key={proyecto.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                }}
              >
                <div>
                  <strong>{proyecto.nombre}</strong>
                  <span
                    style={{
                      marginLeft: '12px',
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      background:
                        proyecto.estado === 'ACTIVO'
                          ? '#dbeafe'
                          : proyecto.estado === 'COMPLETADO'
                          ? '#dcfce7'
                          : '#fef3c7',
                      color:
                        proyecto.estado === 'ACTIVO'
                          ? '#1d4ed8'
                          : proyecto.estado === 'COMPLETADO'
                          ? '#166534'
                          : '#92400e',
                    }}
                  >
                    {proyecto.estado}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '6px',
                      background: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${proyecto.porcentajeAvance || 0}%`,
                        height: '100%',
                        background: '#3b82f6',
                        borderRadius: '3px',
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
    </main>
  )
}

export default DashboardView