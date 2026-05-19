package com.Innovatech.demo.enums;

public enum UserRole {
    ADMIN("ADMIN", "Administrador del sistema"),
    DEVELOPER("DEVELOPER", "Desarrollador/Consultor"),
    MANAGER("MANAGER", "Gestor de Proyectos"),
    USER("USER", "Usuario estándar");

    private final String code;
    private final String description;

    UserRole(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public static UserRole fromString(String role) {
        for (UserRole r : UserRole.values()) {
            if (r.code.equalsIgnoreCase(role) || r.name().equalsIgnoreCase(role)) {
                return r;
            }
        }
        return USER; // Default
    }
}