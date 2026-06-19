package com.Innovatech.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
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
    
    public User() {
    }

    public User(Long id, String username, String password, String role, boolean canManageUsers, boolean canViewAllProjects) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.canManageUsers = canManageUsers;
        this.canViewAllProjects = canViewAllProjects;
    }

    // Constructor útil para pruebas
    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.canManageUsers = false;
        this.canViewAllProjects = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isCanManageUsers() {
        return canManageUsers;
    }

    public void setCanManageUsers(boolean canManageUsers) {
        this.canManageUsers = canManageUsers;
    }

    public boolean isCanViewAllProjects() {
        return canViewAllProjects;
    }

    public void setCanViewAllProjects(boolean canViewAllProjects) {
        this.canViewAllProjects = canViewAllProjects;
    }
}