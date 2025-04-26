package com.monsha.incham.controller;

import com.monsha.incham.model.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @GetMapping("/api/user")
    public User getUser() {
        return new User("Иван Иванов", 30);
    }
}
