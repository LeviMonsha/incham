package com.monsha.incham.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.service.UserService;

@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {

  private final UserService userService;

  public AdminController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/users")
  public ResponseEntity<List<UserRegisterRequest>> getUsers() {
    List<UserRegisterRequest> users = userService.getUsers();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/{login}")
  public ResponseEntity<UserRegisterRequest> getUserByLogin(@PathVariable String login) {
    UserRegisterRequest user = userService.findByUsername(login);
    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.ok(user);
  }

  @GetMapping("/total-users")
  public ResponseEntity<Long> getTotalUsers() {
    Long count = userService.getTotalUsers();
    return ResponseEntity.ok(count);
  }

  @GetMapping("/last-month-users")
  public ResponseEntity<Long> getTotalLastMonthUsers() {
    Long count = userService.getTotalLastMonthUsers();
    return ResponseEntity.ok(count);
  }

  @GetMapping("/last-user")
  public ResponseEntity<UserRegisterRequest> getLastUser() {
    UserRegisterRequest user = userService.getLastUser();
    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.ok(user);
  }

  public static class LastNameRequest {
    private String lastName;

    public String getlastName() {
      return lastName;
    }

    public void setlastName(String lastName) {
      this.lastName = lastName;
    }
  }

  @PostMapping("/find-surname-users")
  public ResponseEntity<List<UserRegisterRequest>> findlastNameUsers(@RequestBody LastNameRequest request) {
    if (request.getlastName() == null || request.getlastName().isEmpty()) {
      return ResponseEntity.badRequest().build();
    }
    List<UserRegisterRequest> users = userService.findLastNameUsers(request.getlastName());
    return ResponseEntity.ok(users);
  }
}
