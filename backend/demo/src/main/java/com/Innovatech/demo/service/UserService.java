package com.Innovatech.demo.service;

import com.Innovatech.demo.dto.LoginRequest;
import com.Innovatech.demo.dto.UserDTO;
import com.Innovatech.demo.model.User;
import com.Innovatech.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO authenticate(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .filter(u -> u.getPassword().equals(request.password())) // En prod usar BCrypt
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
        
        return new UserDTO(user.getId(), user.getUsername());
    }

    public UserDTO updateUsername(Long id, String newUsername) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        user.setUsername(newUsername);
        User updatedUser = userRepository.save(user);
        
        return new UserDTO(updatedUser.getId(), updatedUser.getUsername());
    }
}