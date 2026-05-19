```markdown
# Innovatech Solutions - Portal de Gestión de Proyectos

## Descripción

Sistema de gestión de proyectos y KPIs para Innovatech Solutions, empresa de consultoría tecnológica con más de 120 empleados. La plataforma permite la planificación, seguimiento de proyectos, administración de tareas y visualización de métricas en tiempo real.

**Cliente:** Innovatech Solutions
**Propósito:** Centralizar la gestión de proyectos y mejorar la visibilidad del desempeño mediante una arquitectura de microservicios.

---

## Arquitectura del Sistema

```
→ Frontend (React + Vite) → API Gateway (Express) → Microservicios
                                                      → Usuarios (Spring Boot)
                                                      → Proyectos (Spring Boot)
                                                      → Analítica (FastAPI)
```

---

## Tecnologías Utilizadas

| Capa | Tecnología |
|------|------------|
| Frontend | React 18, Vite, Context API |
| API Gateway | Node.js, Express.js |
| Microservicios | Spring Boot 3.2, Java 17 |
| Analítica | FastAPI, Python 3.12 |
| Base de Datos | PostgreSQL (NeonDB) / H2 |
| Migraciones | Flyway |
| Orquestación | Docker (opcional) |





## Patrones de Diseño Implementados

| Patrón | Ubicación | Propósito |
|--------|-----------|-----------|
| Factory Method | UserFactory, ProyectoFactory | Creación centralizada de objetos |
| Repository Pattern | Spring Data JPA | Abstracción de acceso a datos |
| Strategy Pattern | Analytics Service | Cálculo dinámico de métricas |
| Singleton | Spring Beans, FastAPI | Instancia única de servicios |
| DTO Pattern | Paquete dto/ | Transferencia de datos |
| Backend For Frontend | API Gateway | Agregación de respuestas |

---

## Requisitos Previos

- Java 17 o superior
- Python 3.12 o superior
- Node.js 18 o superior
- Maven (incluido wrapper)
- PostgreSQL (opcional, usa H2 por defecto)

---

## Instalación y Ejecución Local

### Paso 1: Clonar el repositorio

### Paso 2: Ejecutar Usuarios Service

```bash
cd backend/usuarios-service
./mvnw.cmd spring-boot:run
```
→ Servicio disponible en `http://localhost:8080`

### Paso 3: Ejecutar Proyectos Service

```bash
cd backend/proyectos-service
./mvnw.cmd spring-boot:run
```
→ Servicio disponible en `http://localhost:8081`

### Paso 4: Ejecutar Analítica Service

```bash
cd backend/analitica-service
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
→ Servicio disponible en `http://localhost:8000`

### Paso 5: Ejecutar API Gateway

```bash
cd frontend/api-gateway
npm install
node server.js
```
→ Gateway disponible en `http://localhost:3000`

### Paso 6: Ejecutar Frontend

```bash
cd frontend
npm install
npm run dev
```
→ Aplicación disponible en `http://localhost:5173`

---

## Endpoints del API Gateway

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registrar usuario |
| PUT | `/api/auth/profile/{id}` | Actualizar perfil |

### Proyectos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proyectos` | Listar todos los proyectos |
| POST | `/api/proyectos` | Crear nuevo proyecto |
| GET | `/api/proyectos/{id}` | Obtener proyecto por ID |
| PUT | `/api/proyectos/{id}/avance` | Actualizar avance |
| DELETE | `/api/proyectos/{id}` | Eliminar proyecto |

### Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/tareas` | Crear nueva tarea |
| GET | `/api/proyectos/{proyectoId}/tareas` | Listar tareas por proyecto |
| PUT | `/api/tareas/{id}/estado` | Actualizar estado de tarea |

### Analítica

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/analytics/dashboard` | Obtener dashboard de KPIs |
| GET | `/api/analytics/kpis` | Obtener todas las métricas |
| GET | `/api/analytics/proyectos/avance` | Avance de proyectos |
| GET | `/api/analytics/recursos/carga` | Carga de recursos |

---

## Credenciales de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | Administrador |
| innovatech_user | password | Usuario estándar |

---

## Variables de Entorno (Base de Datos)

Para usar NeonDB (PostgreSQL en la nube), crea un archivo `.env` en cada microservicio:

```properties
DATABASE_URL=jdbc:postgresql://host:5432/database?sslmode=require
DATABASE_USERNAME=tu_usuario
DATABASE_PASSWORD=tu_contraseña
```

---

## Migraciones de Base de Datos

Los microservicios usan Flyway para migraciones:

```bash
# Ejecutar migraciones
cd backend/usuarios-service
mvnw.cmd flyway:migrate -Dflyway.schemas=usuarios_schema -Dflyway.createSchemas=true

cd backend/proyectos-service
mvnw.cmd flyway:migrate -Dflyway.schemas=proyectos_schema -Dflyway.createSchemas=true
```

---

## Ejecución con Docker (Opcional)

```bash
docker-compose up -d
```

---

## Pruebas Unitarias

### Backend (Spring Boot)

```bash
cd backend/usuarios-service
./mvnw.cmd test
```

### Frontend (React)

```bash
cd frontend
npm run test
```

## Contribución

1. Crear una rama desde `develop`
2. Implementar la funcionalidad
3. Ejecutar pruebas locales
4. Crear Pull Request a `develop`

