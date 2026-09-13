package com.likhith.gocity.controller;

import com.likhith.gocity.dto.LoginRequest;
import com.likhith.gocity.dto.RegisterRequest;
import com.likhith.gocity.entity.Profile;
import com.likhith.gocity.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Profile> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<Profile> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}