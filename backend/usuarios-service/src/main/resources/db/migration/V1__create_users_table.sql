-- Si la tabla ya existe, la borra y la crea de nuevo
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    can_manage_users BOOLEAN DEFAULT FALSE,
    can_view_all_projects BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario admin
INSERT INTO users (username, password, role, can_manage_users, can_view_all_projects) 
VALUES ('admin', 'admin123', 'ADMIN', true, true)
ON CONFLICT (username) DO NOTHING;

-- Insertar usuario normal
INSERT INTO users (username, password, role, can_manage_users, can_view_all_projects) 
VALUES ('innovatech_user', 'password', 'USER', false, false)
ON CONFLICT (username) DO NOTHING;