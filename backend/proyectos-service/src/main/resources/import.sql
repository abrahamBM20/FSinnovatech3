-- Proyectos de prueba consistentes con el informe Innovatech
INSERT INTO proyectos (nombre, descripcion, tipo, estado, fecha_inicio, fecha_fin_estimada, porcentaje_avance, presupuesto_asignado, responsable_id, created_at, updated_at) 
VALUES ('Innovatech Cloud Migration', 'Migración de infraestructura a la nube', 'AGIL', 'ACTIVO', '2025-01-10T00:00:00', '2025-04-10T00:00:00', 45, 150000, 1, NOW(), NOW());

INSERT INTO proyectos (nombre, descripcion, tipo, estado, fecha_inicio, fecha_fin_estimada, porcentaje_avance, presupuesto_asignado, responsable_id, created_at, updated_at) 
VALUES ('Dashboard Analytics', 'Desarrollo de dashboard de KPIs para directivos', 'AGIL', 'ACTIVO', '2025-02-01T00:00:00', '2025-05-01T00:00:00', 25, 80000, 2, NOW(), NOW());

INSERT INTO proyectos (nombre, descripcion, tipo, estado, fecha_inicio, fecha_fin_estimada, porcentaje_avance, presupuesto_asignado, responsable_id, created_at, updated_at) 
VALUES ('ERP Integration', 'Integración de sistemas ERP legacy', 'TRADICIONAL', 'PLANIFICACION', '2025-03-01T00:00:00', '2025-09-01T00:00:00', 0, 300000, 1, NOW(), NOW());

-- Tareas para el primer proyecto
INSERT INTO tareas (titulo, descripcion, proyecto_id, asignado_a, estado, fecha_limite, horas_estimadas, created_at)
VALUES ('Configurar Kubernetes cluster', 'Configuración inicial del cluster K8s', 1, 3, 'COMPLETADA', '2025-01-20T00:00:00', 40, NOW());

INSERT INTO tareas (titulo, descripcion, proyecto_id, asignado_a, estado, fecha_limite, horas_estimadas, created_at)
VALUES ('Migrar base de datos', 'Migración de PostgreSQL a la nube', 1, 3, 'EN_PROGRESO', '2025-02-15T00:00:00', 80, NOW());

INSERT INTO tareas (titulo, descripcion, proyecto_id, asignado_a, estado, fecha_limite, horas_estimadas, created_at)
VALUES ('Configurar CI/CD pipeline', 'Pipeline automatizado con GitHub Actions', 1, 4, 'PENDIENTE', '2025-03-01T00:00:00', 30, NOW());