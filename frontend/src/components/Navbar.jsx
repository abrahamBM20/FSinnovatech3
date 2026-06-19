function Navbar({ currentView = 'dashboard', onNavigate, user, onLogout }) {
  const tabs = [
    { id: 'dashboard', label: 'Resumen', icon: '◉' },
    { id: 'proyectos', label: 'Proyectos', icon: '▣' },
    { id: 'perfil', label: 'Perfil', icon: '◌' },
  ]

  const initials = user?.username?.charAt(0)?.toUpperCase() || 'U'

  return (
    <aside className="sidebar page-card">
      <div className="sidebar__brand">
        <div className="brand-mark">I3</div>
        <div className="brand-copy">
          <small>Innovatech Solutions</small>
          <strong>Portal Ejecutivo</strong>
        </div>
      </div>

      <div className="sidebar__nav" role="navigation" aria-label="Navegación principal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-active={currentView === tab.id}
            onClick={() => onNavigate(tab.id)}
            type="button"
          >
            <span>{tab.label}</span>
            <span aria-hidden="true">{tab.icon}</span>
          </button>
        ))}
      </div>

      <div className="sidebar__footer">
        <div className="profile-chip">
          <div className="profile-chip__avatar">{initials}</div>
          <div className="profile-chip__copy">
            <strong>{user?.username || 'Usuario'}</strong>
            <span>Sesión activa</span>
          </div>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default Navbar