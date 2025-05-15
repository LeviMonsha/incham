package com.monsha.incham.controller;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/secure")
public class SecurityController {

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/session")
    public ResponseEntity<?> checkSession(Authentication authentication) {
        boolean authenticated = authentication != null && authentication.isAuthenticated();
        return ResponseEntity.ok(Map.of("authenticated", authenticated));
    }

    @PostMapping("/captcha")
    public ResponseEntity<String> verifyCaptcha(@RequestBody Map<String, String> body) {
        String token = body.get("recaptchaToken");
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body("Токен капчи отсутствует");
        }

        URI verifyUri = UriComponentsBuilder
                .fromHttpUrl("https://www.google.com/recaptcha/api/siteverify")
                .queryParam("secret", recaptchaSecret)
                .queryParam("response", token)
                .build()
                .toUri();

        Map response = restTemplate.getForObject(verifyUri, Map.class);

        Boolean success = (Boolean) response.get("success");
        if (Boolean.TRUE.equals(success)) {
            return ResponseEntity.ok("Капча пройдена успешно!");
        } else {
            return ResponseEntity.badRequest().body("Ошибка проверки капчи");
        }
    }
}
