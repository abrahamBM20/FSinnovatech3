function KPICards({ data, loading }) {
  if (loading) {
    return (
      <div className="metric-grid" aria-busy="true" aria-label="Cargando indicadores">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="metric-card metric-card--loading" />
        ))}
      </div>
    )
  }

  const cards = [
    { label: 'Total proyectos', value: data?.total_proyectos || 0, icon: '●' },
    { label: 'Proyectos activos', value: data?.proyectos_activos || 0, icon: '▲' },
    { label: 'Proyectos completados', value: data?.proyectos_completados || 0, icon: '■' },
    { label: 'Avance promedio', value: `${data?.avance_promedio || 0}%`, icon: '↗' },
    { label: 'Tareas pendientes', value: data?.tareas_pendientes || 0, icon: '⏳' },
    { label: 'Completadas hoy', value: data?.tareas_completadas_hoy || 0, icon: '✓' },
  ]

  return (
    <div className="metric-grid">
      {cards.map((card) => (
        <article
          key={card.label}
          className="metric-card"
        >
          <div className="metric-card__icon">{card.icon}</div>
          <div className="metric-card__value">{card.value}</div>
          <div className="metric-card__label">{card.label}</div>
        </article>
      ))}
    </div>
  )
}

export default KPICards