package com.Innovatech.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
    
    // NUEVO: Rol del usuario para el Factory Method
    @Column(nullable = false)
    private String role = "USER";
    
    // NUEVOS: Permisos específicos (para demostrar la utilidad del Factory)
    @Column(nullable = false)
    private boolean canManageUsers = false;
    
    @Column(nullable = false)
    private boolean canViewAllProjects = false;
    
    // Constructor útil para pruebas
    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.canManageUsers = false;
        this.canViewAllProjects = false;
    }
}