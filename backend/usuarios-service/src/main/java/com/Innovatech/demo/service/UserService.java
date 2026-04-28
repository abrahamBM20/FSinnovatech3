package com.Innovatech.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Innovatech.demo.dto.AuthResponse;
import com.Innovatech.demo.dto.LoginRequest;
import com.Innovatech.demo.dto.RegisterRequest;
import com.Innovatech.demo.dto.UserDTO;
import com.Innovatech.demo.model.User;
import com.Innovatech.demo.repository.UserRepository;
import com.Innovatech.demo.security.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil; // Inyectamos la utilidad para generar el token

    public AuthResponse authenticate(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .filter(u -> u.getPassword().equals(request.password()))
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
        
        // Generamos el token JWT
        String token = jwtUtil.generateToken(user.getUsername());
        UserDTO userDto = new UserDTO(user.getId(), user.getUsername());
        
        // Devolvemos el DTO combinado
        return new AuthResponse(token, userDto);
    }

    public UserDTO register(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }

        User newUser = new User();
        newUser.setUsername(request.username());
        newUser.setPassword(request.password());

        User savedUser = userRepository.save(newUser);
        return new UserDTO(savedUser.getId(), savedUser.getUsername());
    }

    public UserDTO updateUsername(Long id, String newUsername) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        user.setUsername(newUsername);
        User updatedUser = userRepository.save(user);
        
        return new UserDTO(updatedUser.getId(), updatedUser.getUsername());
    }
}