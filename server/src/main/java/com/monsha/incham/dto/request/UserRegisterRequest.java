package com.monsha.incham.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegisterRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotNull
    private Boolean isAdult;

    @NotBlank
    private String gender;

    @NotBlank
    private String password;

    @NotNull
    private Boolean isDarkTheme;

    private LocalDate created;
}
