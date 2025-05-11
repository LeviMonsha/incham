package com.monsha.incham.service;

import com.monsha.incham.entity.User;
import com.monsha.incham.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User registerUser(User user) {
        System.out.println("Проверка пользователя: " + user.getUsername());
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username уже занят");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email уже занят");
        }

        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        User savedUser = userRepository.save(user);
        System.out.println("Сохранён пользователь с ID: " + savedUser.getId());
        return savedUser;
    }
}