# Frontend de Innovatech

Interfaz principal del portal ejecutivo de Innovatech Solutions. El frontend se reorganizó con un MVVM ligero para separar presentación, navegación y carga de datos, manteniendo el código sencillo de extender cuando los servicios backend evolucionen.

## Cambios realizados

- Se rediseñó la experiencia con una shell ejecutiva, sidebar persistente y secciones visuales para métricas, proyectos y perfil.
- Se separó la lógica de navegación y consumo de datos en viewmodels.
- Se introdujeron datos de respaldo para que la interfaz siga operativa aunque algún servicio todavía no responda.
- Se sustituyó la apariencia de plantilla por un lenguaje visual más serio, sobrio y responsive.
- Se mantuvo el frontend preparado para correr tanto en local como dentro de Docker.

## Arquitectura

El frontend usa un MVVM ligero:

- Views: componentes en `src/features` y `src/components`.
- ViewModels: hooks en `src/viewmodels`.
- Model: datos expuestos por autenticación, gateway y respuestas de respaldo.

## Ejecución local

```bash
npm install
npm run dev
```

## Ejecución con Docker

Desde la raíz del repositorio:

```bash
docker compose up --build
```

Luego abre:

- Frontend: `http://localhost:5173`
- Gateway: `http://localhost:3000/health`

## Estructura principal

- `src/components/PortalLayout.jsx`: marco visual del portal autenticado.
- `src/features/auth/LoginView.jsx`: acceso al sistema.
- `src/features/analytics/DashboardView.jsx`: panel ejecutivo.
- `src/features/proyectos/ProyectosView.jsx`: administración de proyectos.
- `src/features/profile/ProfileView.jsx`: edición de perfil.

## Nota

Si el gateway o los microservicios todavía no están completamente listos, la interfaz muestra información de respaldo para mantener una experiencia presentable mientras se completa el backend.
