package com.monsha.incham.controller;

import java.security.Principal;

import com.monsha.incham.dto.request.UserRegisterRequest;
import com.monsha.incham.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/api/user")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/profile")
  public UserRegisterRequest getProfileInfo(Principal principal) {
    String login = principal.getName();
    return userService.findByUsername(login);
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
    logoutHandler.logout(request, response, SecurityContextHolder.getContext().getAuthentication());
    return ResponseEntity.ok("Выход из системы выполнен");
  }

  @GetMapping("/theme")
  public ResponseEntity<Boolean> getDarkTheme(Principal principal) {
      String login = principal.getName();
      UserRegisterRequest user = userService.findByUsername(login);
      System.out.println(user);
      return ResponseEntity.ok(user.getIsDarkTheme());
  }

  @PostMapping("/theme")
  public ResponseEntity<String> setDarkTheme(Principal principal, @RequestBody Boolean isDarkTheme) {
      String login = principal.getName();
      UserRegisterRequest user = userService.findByUsername(login);
      user.setIsDarkTheme(isDarkTheme);
      userService.updateTheme(login, isDarkTheme);
      return ResponseEntity.ok("Тема успешно обновлена");
  }
}