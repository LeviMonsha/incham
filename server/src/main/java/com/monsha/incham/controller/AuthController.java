package com.monsha.incham.controller;

import com.monsha.incham.dto.request.UserLoginRequest;
import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.entity.User;
import com.monsha.incham.exception.UserNotFoundException;
import com.monsha.incham.service.UserService;
import com.monsha.incham.mapper.UserMapper;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest loginRequest) {
        try {
            boolean valid = userService.checkPassword(loginRequest.getEmail(), loginRequest.getPassword());
            if (!valid) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный логин или пароль");
            }
            
            return ResponseEntity.ok("Успешный вход");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не найден");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest dto, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Некорректные данные");
        }

        try {
            System.out.println("Регистрация пользователя: " + dto.getUsername());
            UserRegisterRequest createdUser = userService.create(dto);

            System.out.println("Пользователь сохранён: " + createdUser.getUsername());
            return ResponseEntity.ok("Пользователь успешно зарегистрирован");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
