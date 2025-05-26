package com.monsha.incham.dto.request;

import java.time.LocalDate;

import com.monsha.incham.annotation.NoDoubleLastName;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegisterRequest {

    @NotBlank(message = "Имя обязательно")
    @Size(min = 2, max = 15, message = "Имя должно быть от 2 до 15 символов")
    @Pattern(regexp = "^[А-Яа-яЁёA-Za-z]+$", message = "Имя должно содержать только буквы")
    private String firstName;

    @NotBlank(message = "Фамилия обязательна")
    @Size(min = 2, max = 15, message = "Фамилия должна быть от 2 до 15 символов")
    @Pattern(regexp = "^[А-Яа-яЁёA-Za-z]+$", message = "Фамилия должна содержать только буквы")
    @NoDoubleLastName
    private String lastName;

    @NotBlank(message = "Логин обязателен")
    @Size(min = 6, message = "Логин должен быть не менее 6 символов")
    private String username;

    @NotBlank(message = "Email обязателен")
    @Email(message = "Неверный формат email")
    private String email;

    @NotNull(message = "Укажите, достигли ли вы 18 лет")
    private Boolean isAdult;

    @NotBlank(message = "Пол обязателен")
    @Pattern(regexp = "Мужской|Женский", message = "Выберите пол")
    private String gender;

    @NotBlank(message = "Пароль обязателен")
    @Size(min = 8, message = "Пароль должен быть не менее 8 символов")
    @Pattern.List({
        @Pattern(regexp = ".*[a-z].*", message = "Пароль должен содержать строчные буквы"),
        @Pattern(regexp = ".*[A-Z].*", message = "Пароль должен содержать прописные буквы"),
        @Pattern(regexp = ".*\\d.*", message = "Пароль должен содержать цифры"),
        @Pattern(regexp = ".*[\\W_].*", message = "Пароль должен содержать специальные символы")
    })
    private String password;

    @NotNull
    private Boolean isDarkTheme;

    private LocalDate created;
}
