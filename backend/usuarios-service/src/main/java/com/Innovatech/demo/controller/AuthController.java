// controller/AuthController.java
package com.Innovatech.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Innovatech.demo.dto.AuthResponse;
import com.Innovatech.demo.dto.LoginRequest;
import com.Innovatech.demo.dto.RegisterRequest;
import com.Innovatech.demo.dto.UserDTO;
import com.Innovatech.demo.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    // ¡AQUÍ ESTÁ LA CORRECCIÓN! Cambiamos UserDTO por AuthResponse
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<UserDTO> updateProfile(@PathVariable Long id, @RequestBody String newUsername) {
        String cleanUsername = newUsername.replace("\"", "");
        return ResponseEntity.ok(userService.updateUsername(id, cleanUsername));
    }
}