-- Eliminar tablas si existen (para limpiar)
DROP TABLE IF EXISTS tareas CASCADE;
DROP TABLE IF EXISTS proyectos CASCADE;

-- Tabla de proyectos
CREATE TABLE proyectos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) NOT NULL,
    estado VARCHAR(50) DEFAULT 'PLANIFICACION',
    fecha_inicio TIMESTAMP,
    fecha_fin_estimada TIMESTAMP,
    fecha_fin_real TIMESTAMP,
    porcentaje_avance INTEGER DEFAULT 0,
    presupuesto_asignado DECIMAL(15,2),
    responsable_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tareas
CREATE TABLE tareas (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    proyecto_id BIGINT NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
    asignado_a BIGINT,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    fecha_limite TIMESTAMP,
    fecha_completado TIMESTAMP,
    horas_estimadas INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_proyectos_responsable ON proyectos(responsable_id);
CREATE INDEX idx_tareas_proyecto ON tareas(proyecto_id);
CREATE INDEX idx_tareas_asignado ON tareas(asignado_a);
CREATE INDEX idx_tareas_estado ON tareas(estado);

-- Insertar proyectos de prueba
INSERT INTO proyectos (nombre, descripcion, tipo, estado, fecha_inicio, fecha_fin_estimada, porcentaje_avance, responsable_id)
VALUES ('Innovatech Cloud Migration', 'Migración de infraestructura a la nube', 'AGIL', 'ACTIVO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '90 days', 45, 1);

INSERT INTO proyectos (nombre, descripcion, tipo, estado, fecha_inicio, fecha_fin_estimada, porcentaje_avance, responsable_id)
VALUES ('Dashboard Analytics', 'Desarrollo de dashboard de KPIs', 'AGIL', 'ACTIVO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '60 days', 25, 2);

INSERT INTO proyectos (nombre, descripcion, tipo, estado, fecha_inicio, fecha_fin_estimada, porcentaje_avance, responsable_id)
VALUES ('ERP Integration', 'Integración de sistemas ERP legacy', 'TRADICIONAL', 'PLANIFICACION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '180 days', 0, 1);

-- Insertar tareas de prueba
INSERT INTO tareas (titulo, descripcion, proyecto_id, estado, fecha_limite, horas_estimadas)
VALUES ('Configurar Kubernetes', 'Configuración inicial del cluster K8s', 1, 'COMPLETADA', CURRENT_TIMESTAMP + INTERVAL '30 days', 40);

INSERT INTO tareas (titulo, descripcion, proyecto_id, estado, fecha_limite, horas_estimadas)
VALUES ('Migrar base de datos', 'Migración de PostgreSQL a la nube', 1, 'EN_PROGRESO', CURRENT_TIMESTAMP + INTERVAL '45 days', 80);

INSERT INTO tareas (titulo, descripcion, proyecto_id, estado, fecha_limite, horas_estimadas)
VALUES ('Configurar CI/CD pipeline', 'Pipeline automatizado con GitHub Actions', 1, 'PENDIENTE', CURRENT_TIMESTAMP + INTERVAL '60 days', 30);