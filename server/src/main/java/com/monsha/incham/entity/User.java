package com.monsha.incham.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "is_adult", nullable = false)
    private Boolean isAdult;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String password;

    @Column(name = "is_dark_theme", nullable = false)
    private Boolean isDarkTheme;

    @Column(nullable = false)
    private LocalDate created;
}
