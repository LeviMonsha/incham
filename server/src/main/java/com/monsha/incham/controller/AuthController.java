package com.monsha.incham.controller;

import com.monsha.incham.dto.request.UserLoginRequest;
import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.entity.User;
import com.monsha.incham.exception.UserNotFoundException;
import com.monsha.incham.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest loginRequest, HttpServletRequest request) {
        try {
            boolean valid = userService.checkPassword(loginRequest.getEmail(), loginRequest.getPassword());
            if (!valid) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный логин или пароль");
            }

            UserRegisterRequest user = userService.findByEmail(loginRequest.getEmail());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не найден");
            }

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            request.getSession(true).setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            return ResponseEntity.ok(Map.of("message", "Успешная аутентификация для пользователя: " + user.getEmail()));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не найден");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка сервера");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest dto, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Некорректные данные");
        }

        try {
            UserRegisterRequest createdUser = userService.create(dto);
            return ResponseEntity.ok(Map.of("message", "Пользователь успешно зарегистрирован", "username", createdUser.getUsername()));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
