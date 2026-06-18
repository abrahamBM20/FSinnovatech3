import Navbar from './Navbar'

function PortalLayout({ shell, currentView, onNavigate, children }) {
  return (
    <div className="app-shell">
      <div className="portal-frame">
        <div className="portal-grid">
          <Navbar
            currentView={currentView}
            onNavigate={onNavigate}
            user={shell.user}
            onLogout={shell.logout}
          />

          <main className="portal-main">
            <header className="topbar">
              <div>
                <span className="eyebrow eyebrow--soft">{shell.companyName}</span>
                <h1 className="topbar-title">{shell.portalName}</h1>
                <p style={{ color: 'var(--muted)', marginTop: 8 }}>{shell.subtitle}</p>
              </div>
              <div className="topbar-meta">
                <span className="status-badge status-badge--success">Diseño activo</span>
                <span className="status-badge">Sesión: {shell.user?.username || 'Usuario'}</span>
              </div>
            </header>

            <div className="app-shell__content">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default PortalLayout
