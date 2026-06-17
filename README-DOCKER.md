# Guía para levantar todo con Docker Compose

## Requisitos

- Docker Desktop ejecutandose.
- Los archivos `.env` ya existentes en `backend/usuarios-service/` y `backend/proyectos-service/`.

## Servicios que se levantan

- `usuarios-service` en `http://localhost:8080`
- `proyectos-service` en `http://localhost:8081`
- `analitica-service` en `http://localhost:8000`
- `api-gateway` en `http://localhost:3000`
- `frontend` en `http://localhost:5173`

## Arranque

1. Abrir una terminal en la raiz del proyecto `FSinnovatech3`.
2. Verificar que existan los archivos `.env` de los microservicios de Java.
3. Ejecutar:

```bash
docker compose up --build
```

## Verificacion rapida

- Frontend: `http://localhost:5173`
- Gateway: `http://localhost:3000/health`
- Usuarios: `http://localhost:8080/`
- Proyectos: `http://localhost:8081/`
- Analitica: `http://localhost:8000/`

## Apagar todo

```bash
docker compose down
```

## Si quieres reconstruir desde cero

```bash
docker compose down -v
docker compose up --build
```