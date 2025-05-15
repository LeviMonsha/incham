package com.monsha.incham.mapper;

import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserRegisterRequest toRegisterRequest(User user) {
        UserRegisterRequest dto = new UserRegisterRequest();
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setIsAdult(user.getIsAdult());
        dto.setGender(user.getGender());
        dto.setPassword(null);
        dto.setIsDarkTheme(user.getIsDarkTheme());
        dto.setCreated(user.getCreated());
        return dto;
    }

    public User toEntity(UserRegisterRequest dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setIsAdult(dto.getIsAdult());
        user.setGender(dto.getGender());
        user.setIsDarkTheme(dto.getIsDarkTheme());
        user.setCreated(dto.getCreated());
        return user;
    }
}
