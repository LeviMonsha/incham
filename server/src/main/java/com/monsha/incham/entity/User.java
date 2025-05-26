package com.monsha.incham.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@Table(name = "users")
public class User implements UserDetails {
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

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String password;

    @Column(name = "is_dark_theme", nullable = false)
    private Boolean isDarkTheme;

    @Column(nullable = false)
    private LocalDate created;

    @Transient
    private Collection<? extends GrantedAuthority> authorities;

    public User() {
    }

    public User(Long id,
                String username,
                String email,
                String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = getAuthorities();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }
}
