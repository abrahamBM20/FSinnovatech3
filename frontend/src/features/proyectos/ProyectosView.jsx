import { useProyectosViewModel } from '../../viewmodels/useProyectosViewModel'

function ProyectosView() {
  const vm = useProyectosViewModel()

  return (
    <section className="data-card">
      <div className="section-head">
        <div>
          <h2>Gestión de proyectos</h2>
          <p>{vm.stats.total} proyectos visibles en esta capa de trabajo.</p>
        </div>
        <button className="secondary-button" type="button" onClick={vm.toggleForm}>
          {vm.showForm ? 'Cerrar formulario' : 'Nuevo proyecto'}
        </button>
      </div>

      {vm.error && (
        <div className="alert alert--warning" style={{ marginBottom: 16 }}>
          {vm.error}
        </div>
      )}

      {vm.showForm && (
        <form onSubmit={vm.handleCreateProject} className="stack-list" style={{ marginBottom: 24 }}>
          <div className="grid-cards">
            <div className="grid-span-7 field-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                value={vm.formData.nombre}
                onChange={(event) => vm.setFormData({ ...vm.formData, nombre: event.target.value })}
              />
            </div>
            <div className="grid-span-5 field-group">
              <label htmlFor="tipo">Tipo</label>
              <select
                id="tipo"
                value={vm.formData.tipo}
                onChange={(event) => vm.setFormData({ ...vm.formData, tipo: event.target.value })}
              >
                <option value="AGIL">Ágil</option>
                <option value="TRADICIONAL">Tradicional</option>
                <option value="HIBRIDO">Híbrido</option>
              </select>
            </div>
            <div className="grid-span-12 field-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                rows="4"
                value={vm.formData.descripcion}
                onChange={(event) =>
                  vm.setFormData({ ...vm.formData, descripcion: event.target.value })
                }
              />
            </div>
          </div>

          <div className="toolbar" style={{ margin: 0 }}>
            <span className="toolbar__title">Alta de proyecto</span>
            <button className="primary-button" type="submit">
              Crear proyecto
            </button>
          </div>
        </form>
      )}

      {vm.loading ? (
        <div className="loading-state">Cargando proyectos...</div>
      ) : vm.proyectos.length === 0 ? (
        <div className="empty-state">No hay proyectos creados todavía.</div>
      ) : (
        <div className="stack-list">
          {vm.proyectos.map((proyecto) => (
            <article className="project-card" key={proyecto.id}>
              <div className="project-card__head">
                <div>
                  <h3>{proyecto.nombre}</h3>
                  <p>{proyecto.descripcion || 'Sin descripción registrada'}</p>
                </div>
                <div className="toolbar__meta">
                  <span className="pill">{proyecto.tipo || 'Sin tipo'}</span>
                  <span className="pill">{proyecto.estado || 'Sin estado'}</span>
                </div>
              </div>

              <div className="project-card__progress">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${proyecto.porcentajeAvance || 0}%` }}
                  />
                </div>
                <div className="toolbar" style={{ margin: 0 }}>
                  <span className="toolbar__title">Avance ejecutivo</span>
                  <strong>{proyecto.porcentajeAvance || 0}%</strong>
                </div>
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="100"
                  value={proyecto.porcentajeAvance || 0}
                  onChange={(event) =>
                    vm.handleActualizarAvance(proyecto.id, Number(event.target.value))
                  }
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProyectosView