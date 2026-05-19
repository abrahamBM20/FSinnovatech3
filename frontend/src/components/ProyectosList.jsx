function ProyectosList({ proyectos, onSelectProyecto, onActualizarAvance, loading }) {
  const getEstadoConfig = (estado) => {
    switch (estado) {
      case 'ACTIVO':
        return { bg: '#dbeafe', color: '#1d4ed8', label: 'Activo' }
      case 'COMPLETADO':
        return { bg: '#dcfce7', color: '#166534', label: 'Completado' }
      case 'PLANIFICACION':
        return { bg: '#fef3c7', color: '#92400e', label: 'Planificación' }
      default:
        return { bg: '#f1f5f9', color: '#475569', label: estado || 'Desconocido' }
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
        Cargando proyectos...
      </div>
    )
  }

  if (proyectos.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px',
          background: '#f8fafc',
          borderRadius: '20px',
          color: '#64748b',
        }}
      >
        📁 No hay proyectos creados
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {proyectos.map((proyecto) => {
        const estadoConfig = getEstadoConfig(proyecto.estado)
        return (
          <div
            key={proyecto.id}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid #e2e8f0',
            }}
            onClick={() => onSelectProyecto(proyecto.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0a2540' }}>
                    {proyecto.nombre}
                  </h3>
                  <span
                    style={{
                      background: estadoConfig.bg,
                      color: estadoConfig.color,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  >
                    {estadoConfig.label}
                  </span>
                  <span
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                    }}
                  >
                    {proyecto.tipo}
                  </span>
                </div>
                {proyecto.descripcion && (
                  <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.9rem' }}>
                    {proyecto.descripcion}
                  </p>
                )}
              </div>

              {/* Control de avance */}
              <div
                style={{ minWidth: '160px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>
                  <span>Progreso</span>
                  <span>{proyecto.porcentajeAvance || 0}%</span>
                </div>
                <div
                  style={{
                    width: '100%',
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
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={proyecto.porcentajeAvance || 0}
                  onChange={(e) => onActualizarAvance(proyecto.id, parseInt(e.target.value))}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Stats adicionales */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '24px',
                fontSize: '0.75rem',
                color: '#94a3b8',
              }}
            >
              {proyecto.fechaInicio && (
                <span>📅 Inicio: {new Date(proyecto.fechaInicio).toLocaleDateString()}</span>
              )}
              {proyecto.fechaFinEstimada && (
                <span>🎯 Fin estimado: {new Date(proyecto.fechaFinEstimada).toLocaleDateString()}</span>
              )}
              {proyecto.responsableId && (
                <span>👤 Responsable ID: {proyecto.responsableId}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProyectosList