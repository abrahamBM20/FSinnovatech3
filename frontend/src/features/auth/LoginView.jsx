import { useState } from 'react'
import { useLoginViewModel } from '../../viewmodels/useLoginViewModel'

function LoginView() {
  const vm = useLoginViewModel()

  return (
    <main className="login-shell">
      <section className="page-card login-panel">
        <div className="login-panel__hero">
          <span className="hero-badge">Innovatech / Portal Directivo</span>
          <h1>Control operativo para equipos, proyectos y analítica</h1>
          <p>
            Interfaz ejecutiva construida para tener una vista clara del negocio, con una
            arquitectura simple, mantenible y preparada para evolucionar cuando los servicios
            backend estén completos.
          </p>

          <div className="login-panel__stats">
            <div className="login-panel__stat">
              <strong>MVVM ligero</strong>
              <div>Lógica aislada en viewmodels para facilitar mantenimiento.</div>
            </div>
            <div className="login-panel__stat">
              <strong>Diseño profesional</strong>
              <div>Jerarquía visual, paneles, métricas y comportamiento responsive.</div>
            </div>
          </div>
        </div>

        <div className="login-panel__form">
          <div className="section-head" style={{ alignItems: 'start' }}>
            <div>
              <h2>Acceso al portal</h2>
              <p>Ingresa con tus credenciales para continuar.</p>
            </div>
          </div>

          <form onSubmit={vm.handleSubmit}>
            <div className="field-group">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={vm.username}
                onChange={(event) => vm.setUsername(event.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={vm.password}
                onChange={(event) => vm.setPassword(event.target.value)}
              />
            </div>

            {vm.error && (
              <div className="alert alert--error" style={{ marginBottom: 16 }}>
                {vm.error}
              </div>
            )}

            <button className="primary-button" type="submit" disabled={vm.loading}>
              {vm.loading ? 'Validando acceso...' : 'Entrar al portal'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginView
