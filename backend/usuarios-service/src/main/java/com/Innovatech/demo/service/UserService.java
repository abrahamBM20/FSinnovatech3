package com.Innovatech.demo.service;

import org.springframework.stereotype.Service;

import com.Innovatech.demo.dto.AuthResponse;
import com.Innovatech.demo.dto.LoginRequest;
import com.Innovatech.demo.dto.UpdateProfileRequest;
import com.Innovatech.demo.dto.RegisterRequest;
import com.Innovatech.demo.dto.UserDTO;
import com.Innovatech.demo.factory.UserFactory;  // IMPORTAR LA FACTORY
import com.Innovatech.demo.model.User;
import com.Innovatech.demo.repository.UserRepository;
import com.Innovatech.demo.security.JwtUtil;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final UserFactory userFactory;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, UserFactory userFactory) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.userFactory = userFactory;
    }

    public AuthResponse authenticate(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .filter(u -> u.getPassword().equals(request.password()))
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
        
        String token = jwtUtil.generateToken(user.getUsername());
        UserDTO userDto = toUserDTO(user);
        
        return new AuthResponse(token, userDto);
    }

    public UserDTO register(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }

        //  USO DEL PATRÓN FACTORY METHOD 
        // La creación del usuario se delega a la Factory, que decide
        // qué configuración aplicar según el rol.
        User newUser;
        
        // Lógica para determinar el rol (puedes personalizarla)
        String role = determineRoleByUsername(request.username());
        
        // Uso del Factory Method
        newUser = userFactory.createUser(
            request.username(), 
            request.password(), 
            role
        );

        User savedUser = userRepository.save(newUser);
        return toUserDTO(savedUser);
    }
    
    /**
     * Método auxiliar para determinar el rol según el username
     * Demuestra la flexibilidad del patrón Factory
     */
    private String determineRoleByUsername(String username) {
        if (username.startsWith("admin_")) {
            return "ADMIN";
        } else if (username.startsWith("manager_")) {
            return "MANAGER";
        } else if (username.startsWith("dev_")) {
            return "DEVELOPER";
        }
        return "USER";
    }

    public UserDTO updateUsername(Long id, String newUsername) {
        return updateProfile(id, new UpdateProfileRequest(newUsername, null));
    }

    public UserDTO updateProfile(Long id, UpdateProfileRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        if (request.username() != null && !request.username().isBlank()) {
            user.setUsername(request.username().trim());
        }

        if (request.role() != null && !request.role().isBlank()) {
            applyRole(user, request.role());
        }

        User updatedUser = userRepository.save(user);
        
        return toUserDTO(updatedUser);
    }
    
    // Método adicional para demostrar el Factory con usuario por defecto
    public UserDTO registerDefaultUser(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }
        
        // Uso del método alternativo de la Factory
        User newUser = userFactory.createDefaultUser(request.username(), request.password());
        User savedUser = userRepository.save(newUser);
        
        return toUserDTO(savedUser);
    }

    public UserDTO getProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return toUserDTO(user);
    }

    private void applyRole(User user, String role) {
        String normalized = role.trim().toUpperCase();
        user.setRole(normalized);

        switch (normalized) {
            case "ADMIN":
                user.setCanManageUsers(true);
                user.setCanViewAllProjects(true);
                break;
            case "MANAGER":
                user.setCanManageUsers(false);
                user.setCanViewAllProjects(true);
                break;
            case "DEVELOPER":
            default:
                user.setCanManageUsers(false);
                user.setCanViewAllProjects(false);
                break;
        }
    }

    private UserDTO toUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                user.isCanManageUsers(),
                user.isCanViewAllProjects());
    }
}