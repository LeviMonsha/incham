package com.monsha.incham.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private Boolean isAdult;
    private String gender;
    private String password;
}
