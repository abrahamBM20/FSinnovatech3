import { useProfileViewModel } from '../../viewmodels/useProfileViewModel'

function ProfileView() {
  const vm = useProfileViewModel()

  if (!vm.user) {
    return <div className="empty-state surface">No hay usuario autenticado.</div>
  }

  return (
    <section className="data-card">
      <div className="section-head">
        <div>
          <h2>Perfil de usuario</h2>
          <p>Administración básica de identidad dentro del portal.</p>
        </div>
      </div>

      <div className="grid-cards" style={{ marginBottom: 24 }}>
        <div className="grid-span-4 surface page-card--padded">
          <span className="kpi-card__label">ID de usuario</span>
          <div className="kpi-card__value">{vm.user.id}</div>
        </div>
        <div className="grid-span-4 surface page-card--padded">
          <span className="kpi-card__label">Usuario actual</span>
          <div className="kpi-card__value">{vm.user.username}</div>
        </div>
        <div className="grid-span-4 surface page-card--padded">
          <span className="kpi-card__label">Estado</span>
          <div className="kpi-card__value">Activo</div>
        </div>
      </div>

      <form onSubmit={vm.handleSave} className="stack-list">
        <div className="field-group">
          <label htmlFor="profile-username">Nuevo username</label>
          <input
            id="profile-username"
            type="text"
            value={vm.username}
            onChange={(event) => vm.setUsername(event.target.value)}
          />
        </div>

        {vm.error && <div className="alert alert--error">{vm.error}</div>}
        {vm.feedback && <div className="alert alert--info">{vm.feedback}</div>}

        <div className="toolbar" style={{ margin: 0 }}>
          <span className="toolbar__title">Actualización manual de perfil</span>
          <button className="primary-button" type="submit" disabled={vm.loading}>
            {vm.loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProfileView
