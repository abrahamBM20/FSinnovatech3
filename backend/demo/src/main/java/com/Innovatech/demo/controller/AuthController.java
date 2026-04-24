// controller/AuthController.java
package com.Innovatech.demo.controller;

import com.Innovatech.demo.dto.LoginRequest;
import com.Innovatech.demo.dto.UserDTO;
import com.Innovatech.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // URL default de Vite/React
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<UserDTO> updateProfile(@PathVariable Long id, @RequestBody String newUsername) {
        // Quitamos las comillas si el body viene como string simple
        String cleanUsername = newUsername.replace("\"", "");
        return ResponseEntity.ok(userService.updateUsername(id, cleanUsername));
    }
}