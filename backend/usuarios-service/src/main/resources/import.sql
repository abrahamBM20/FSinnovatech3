-- Usuarios con diferentes roles para probar el Factory Method
INSERT INTO users (username, password, role, can_manage_users, can_view_all_projects) VALUES ('admin_root', 'admin123', 'ADMIN', true, true);
INSERT INTO users (username, password, role, can_manage_users, can_view_all_projects) VALUES ('manager_proyectos', 'manager123', 'MANAGER', false, true);
INSERT INTO users (username, password, role, can_manage_users, can_view_all_projects) VALUES ('dev_frontend', 'dev123', 'DEVELOPER', false, false);
INSERT INTO users (username, password, role, can_manage_users, can_view_all_projects) VALUES ('innovatech_user', 'password', 'USER', false, false);