package com.Innovatech.demo.factory;

import org.springframework.stereotype.Component;

import com.Innovatech.demo.enums.UserRole;
import com.Innovatech.demo.model.User;

/**
 * PATRÓN FACTORY METHOD
 * 
 * Este patrón permite crear objetos User de diferentes tipos sin exponer
 * la lógica de creación al cliente. Facilita el mantenimiento y la
 * extensibilidad cuando se añaden nuevos tipos de usuarios.
 * 
 * Problema que resuelve:
 * - Evita la creación dispersa de objetos User en múltiples servicios
 * - Centraliza la lógica de inicialización según el rol
 * - Facilita añadir nuevos tipos de usuario sin modificar código existente
 */
@Component
public class UserFactory {

    /**
     * Método Factory principal
     * @param username Nombre del usuario
     * @param password Contraseña (debe ser hasheada en producción)
     * @param role Rol del usuario (ADMIN, DEVELOPER, MANAGER, USER)
     * @return User configurado según su rol
     */
    public User createUser(String username, String password, String role) {
        UserRole userRole = UserRole.fromString(role);
        return createUserByRole(username, password, userRole);
    }

    /**
     * Sobrecarga del método Factory con rol por defecto
     */
    public User createDefaultUser(String username, String password) {
        return createUserByRole(username, password, UserRole.USER);
    }

    /**
     * Método Factory privado que aplica lógica específica según el rol
     * Este es el verdadero "Factory Method" donde cada rol puede tener
     * configuraciones particulares.
     */
    private User createUserByRole(String username, String password, UserRole role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); // En producción: passwordEncoder.encode(password)
        user.setRole(role.getCode());

        // Lógica específica por tipo de usuario (Factory Method en acción)
        switch (role) {
            case ADMIN:
                // Los admins pueden tener flags especiales
                user.setCanManageUsers(true);
                user.setCanViewAllProjects(true);
                break;
            case MANAGER:
                // Gestores pueden ver todos los proyectos pero no gestionar usuarios
                user.setCanManageUsers(false);
                user.setCanViewAllProjects(true);
                break;
            case DEVELOPER:
                // Developers solo ven sus proyectos asignados
                user.setCanManageUsers(false);
                user.setCanViewAllProjects(false);
                break;
            default:
                user.setCanManageUsers(false);
                user.setCanViewAllProjects(false);
                break;
        }

        return user;
    }
}