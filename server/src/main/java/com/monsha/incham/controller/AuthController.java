package com.monsha.incham.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monsha.incham.dto.request.UserLoginRequest;
import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginRequest loginRequest,
                                BindingResult bindingResult,
                                HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            request.getSession(true).setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            return ResponseEntity.ok(Map.of("message", "Успешная аутентификация"));
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный логин или пароль");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = bindingResult.getFieldErrors().stream()
                .collect(Collectors.toMap(
                    fieldError -> fieldError.getField(),
                    fieldError -> fieldError.getDefaultMessage()
                ));
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            UserRegisterRequest createdUser = userService.create(dto);
            return ResponseEntity.ok(Map.of("message", "Пользователь успешно зарегистрирован", "username", createdUser.getUsername()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("general", e.getMessage()));
        }
    }

    @PostMapping("/validate-field")
    public ResponseEntity<?> validateField(@RequestBody Map<String, String> payload) {
        String field = payload.keySet().iterator().next();
        String value = payload.get(field);

        Map<String, String> errors = new HashMap<>();

        switch (field) {
            case "email":
                if (value == null || value.isBlank()) {
                    errors.put("email", "Email обязателен");
                } else if (!value.matches("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
                    errors.put("email", "Некорректный email");
                }
                break;
            case "username":
                if (value == null || value.isBlank()) {
                    errors.put("username", "Имя пользователя обязательно");
                }
                break;
        }

        if (errors.isEmpty())
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.badRequest().body(errors);
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        boolean exists = userService.usernameExists(username);
        return ResponseEntity.ok(exists);
    }

}
