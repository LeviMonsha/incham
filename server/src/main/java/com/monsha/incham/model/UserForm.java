package com.monsha.incham.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserForm {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String firstName;
    private String lastName;

    @JsonProperty("isAdult")
    private Boolean isAdult;

    private String gender;

    @JsonProperty("isAcceptRules")
    private Boolean isAcceptRules;
}