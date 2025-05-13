package com.monsha.incham.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}