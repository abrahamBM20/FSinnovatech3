function KPICards({ data, loading }) {
  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ flex: 1, minWidth: '180px', background: '#f0f0f0', borderRadius: '16px', padding: '20px', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
    )
  }

  const cards = [
    { label: 'Total Proyectos', value: data?.total_proyectos || 0, icon: '📊', color: '#0a2540' },
    { label: 'Proyectos Activos', value: data?.proyectos_activos || 0, icon: '🟢', color: '#10b981' },
    { label: 'Avance Promedio', value: `${data?.avance_promedio || 0}%`, icon: '📈', color: '#3b82f6' },
    { label: 'Tareas Pendientes', value: data?.tareas_pendientes || 0, icon: '⏳', color: '#f59e0b' },
  ]

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            flex: 1,
            minWidth: '180px',
            background: 'white',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${card.color}`,
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{card.icon}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{card.value}</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{card.label}</div>
        </div>
      ))}
    </div>
  )
}

export default KPICards