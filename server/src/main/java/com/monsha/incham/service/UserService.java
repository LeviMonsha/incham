package com.monsha.incham.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.monsha.incham.exception.UserAlreadyExistsException;
import com.monsha.incham.exception.UserNotFoundException;
import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.entity.User;
import com.monsha.incham.mapper.UserMapper;
import com.monsha.incham.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public List<UserRegisterRequest> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toRegisterRequest)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserRegisterRequest create(UserRegisterRequest userDto) {
        checkIfUserExists(userDto);
        User user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setCreated(LocalDate.now());
        User savedUser = userRepository.save(user);
        return userMapper.toRegisterRequest(savedUser);
    }

    public void checkIfUserExists(UserRegisterRequest userDto) {
        boolean emailExists = !userRepository.findAllByEmail(userDto.getEmail()).isEmpty();
        boolean usernameExists = !userRepository.findAllByUsername(userDto.getUsername()).isEmpty();

        if (emailExists && usernameExists) {
            throw new UserAlreadyExistsException("Пользователь с таким имейлом и логином уже существует");
        }
        if (emailExists) {
            throw new UserAlreadyExistsException("Пользователь с таким имейлом уже существует");
        }
        if (usernameExists) {
            throw new UserAlreadyExistsException("Пользователь с таким логином уже существует");
        }
    }

    public UserRegisterRequest findByUsername(String username) {
        User user = userRepository.findAllByUsername(username).stream().findFirst()
                .orElseThrow(() -> new UserNotFoundException("Пользователь с таким логином '" + username + "' не существует"));
        return userMapper.toRegisterRequest(user);
    }

    public UserRegisterRequest findByEmail(String email) {
        User user = userRepository.findAllByEmail(email).stream().findFirst()
                .orElseThrow(() -> new UserNotFoundException("Пользователь с таким email '" + email + "' не существует"));
        return userMapper.toRegisterRequest(user);
    }

    public boolean checkPassword(String email, String rawPassword) {
        User user = userRepository.findAllByEmail(email).stream().findFirst()
                .orElseThrow(() -> new UserNotFoundException("Пользователь с таким логином '" + email + "' не существует"));
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    @Transactional
    public void updateTheme(String username, boolean isDarkTheme) {
        userRepository.updateUserTheme(username, isDarkTheme);
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalLastMonthUsers() {
        LocalDate lastMonthDate = LocalDate.now().minusMonths(1);
        return userRepository.countUsersSince(lastMonthDate);
    }

    public UserRegisterRequest getLastUser() {
        User user = userRepository.findTopByOrderByIdDesc()
                .orElseThrow(() -> new UserNotFoundException("Пользователи не найдены"));
        return userMapper.toRegisterRequest(user);
    }

    public List<UserRegisterRequest> findLastNameUsers(String lastname) {
        return userRepository.findAllByLastName(lastname).stream()
                .map(userMapper::toRegisterRequest)
                .collect(Collectors.toList());
    }
}
