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
          <p>Administración de identidad y permisos del portal.</p>
        </div>
      </div>

      <div className="grid-cards" style={{ marginBottom: 24 }}>
        <div className="grid-span-4 surface page-card--padded">
          <span className="kpi-card__label">Username</span>
          <div className="kpi-card__value">{vm.user.username}</div>
        </div>
        <div className="grid-span-4 surface page-card--padded">
          <span className="kpi-card__label">Rol</span>
          <div className="kpi-card__value">{vm.user.role || 'USER'}</div>
        </div>
        <div className="grid-span-4 surface page-card--padded">
          <span className="kpi-card__label">Permisos</span>
          <div className="kpi-card__value">
            {vm.user.canManageUsers ? 'Usuarios' : 'Limitado'} / {vm.user.canViewAllProjects ? 'Proyectos globales' : 'Solo propios'}
          </div>
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

        <div className="field-group">
          <label htmlFor="profile-role">Rol</label>
          <select id="profile-role" value={vm.role} onChange={(event) => vm.setRole(event.target.value)}>
            <option value="USER">USER</option>
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
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
