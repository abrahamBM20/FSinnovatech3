import KPICards from '../../components/KPICards'
import { useDashboardViewModel } from '../../viewmodels/useDashboardViewModel'

function DashboardView() {
  const vm = useDashboardViewModel()

  return (
    <div className="content-stack">
      <section className="page-card hero-banner page-card--padded">
        <div className="hero-banner__content">
          <span className="hero-badge">Centro de control</span>
          <h1 className="hero-title">Visión ejecutiva del negocio en tiempo real</h1>
          <p className="hero-copy">
            Esta vista sintetiza métricas, proyectos y actividad reciente en una interfaz de alta
            densidad informativa. Está diseñada para soportar crecimiento sin romper la estructura
            visual ni la mantenibilidad.
          </p>

          <div className="hero-metrics">
            <div className="hero-metric">
              <span className="hero-metric__value">{vm.dashboard?.total_proyectos || 0}</span>
              <span className="hero-metric__label">Proyectos registrados</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric__value">{vm.dashboard?.proyectos_activos || 0}</span>
              <span className="hero-metric__label">Activos en ejecución</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric__value">{vm.dashboard?.avance_promedio || 0}%</span>
              <span className="hero-metric__label">Avance promedio</span>
            </div>
            <div className="hero-metric">
              <span className="hero-metric__value">{vm.dashboard?.tareas_pendientes || 0}</span>
              <span className="hero-metric__label">Tareas pendientes</span>
            </div>
          </div>
        </div>
      </section>

      {vm.error && <div className="alert alert--warning">{vm.error}</div>}

      <KPICards data={vm.dashboard} loading={vm.loading} />

      <section className="data-card">
        <div className="section-head">
          <div>
            <h2>Proyectos destacados</h2>
            <p>{vm.online ? 'Datos sincronizados con el backend' : 'Datos de respaldo para demostración'}</p>
          </div>
          <button className="secondary-button" type="button" onClick={vm.refresh}>
            Actualizar
          </button>
        </div>

        {vm.loading ? (
          <div className="loading-state">Cargando proyectos...</div>
        ) : vm.proyectos.length === 0 ? (
          <div className="empty-state">No hay proyectos disponibles para mostrar.</div>
        ) : (
          <div className="table-shell">
            {vm.proyectos.slice(0, 4).map((proyecto) => (
              <div className="table-row" key={proyecto.id}>
                <div>
                  <strong>{proyecto.nombre}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    {proyecto.descripcion || 'Sin descripción registrada'}
                  </div>
                </div>
                <div style={{ minWidth: '180px' }}>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${proyecto.porcentajeAvance || 0}%` }}
                    />
                  </div>
                </div>
                <strong>{proyecto.porcentajeAvance || 0}%</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default DashboardView