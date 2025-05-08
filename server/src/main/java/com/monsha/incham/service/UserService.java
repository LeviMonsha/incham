package com.monsha.incham.service;

import com.monsha.incham.entity.User;
import com.monsha.incham.model.UserForm;
import com.monsha.incham.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean register(UserForm form) {
        if (userRepository.existsByUsername(form.getUsername())) {
            return false;
        }
        User user = new User();
        user.setUsername(form.getUsername());
        user.setEmail(form.getEmail());

        String hashedPassword = passwordEncoder.encode(form.getPassword());
        user.setPassword(hashedPassword);

        user.setIsAdult(form.getIsAdult());
        user.setGender(form.getGender());

        userRepository.save(user);
        return true;
    }
}