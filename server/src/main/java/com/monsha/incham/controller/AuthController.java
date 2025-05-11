package com.monsha.incham.controller;

import com.monsha.incham.entity.User;
import com.monsha.incham.model.UserDto;
import com.monsha.incham.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto dto) {
        try {
            System.out.println("Регистрация пользователя: " + dto.getUsername());
            User user = new User();
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setUsername(dto.getUsername());
            user.setEmail(dto.getEmail());
            user.setIsAdult(dto.getIsAdult());
            user.setGender(dto.getGender());
            user.setPasswordHash(dto.getPassword());

            User savedUser = userService.registerUser(user);
            System.out.println("Пользователь сохранён: " + savedUser.getId());
            return ResponseEntity.ok("Пользователь успешно зарегистрирован");
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}