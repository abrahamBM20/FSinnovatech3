function TareasList({ tareas, onEstadoChange, loading }) {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'COMPLETADA':
        return { bg: '#dcfce7', color: '#166534', icon: '✅' }
      case 'EN_PROGRESO':
        return { bg: '#dbeafe', color: '#1d4ed8', icon: '🔄' }
      default:
        return { bg: '#fef3c7', color: '#92400e', icon: '⏳' }
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
        Cargando tareas...
      </div>
    )
  }

  if (tareas.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px',
          background: '#f8fafc',
          borderRadius: '16px',
          color: '#64748b',
        }}
      >
        📭 No hay tareas asignadas
      </div>
    )
  }

  return (
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
              padding: '16px 20px',
              background: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{estadoStyle.icon}</span>
                <span style={{ fontWeight: 600, color: '#0a2540' }}>{tarea.titulo}</span>
              </div>
              {tarea.descripcion && (
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '6px' }}>
                  {tarea.descripcion}
                </div>
              )}
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.7rem', color: '#94a3b8' }}>
                {tarea.fechaLimite && (
                  <span>📅 Vence: {new Date(tarea.fechaLimite).toLocaleDateString()}</span>
                )}
                {tarea.horasEstimadas && (
                  <span>⏱️ {tarea.horasEstimadas} horas</span>
                )}
              </div>
            </div>

            <select
              value={tarea.estado}
              onChange={(e) => onEstadoChange(tarea.id, e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '40px',
                border: 'none',
                background: estadoStyle.bg,
                color: estadoStyle.color,
                fontWeight: 600,
                fontSize: '0.75rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="PENDIENTE">📋 Pendiente</option>
              <option value="EN_PROGRESO">🔄 En progreso</option>
              <option value="COMPLETADA">✅ Completada</option>
            </select>
          </div>
        )
      })}
    </div>
  )
}

export default TareasList