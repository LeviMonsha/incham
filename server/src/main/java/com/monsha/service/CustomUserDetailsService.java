package com.monsha.service;

import com.monsha.incham.entity.User;
import com.monsha.incham.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // указывает, что класс представляет собой сервисный компонент,
            // который выполняет операции, связанные с бизнес-логикой,
            // и служит промежуточным слоем между контроллерами и репозиториями
            // (классами, отвечающими за доступ к данным)
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired // Когда класс помечен аннотацией @Autowired, Spring ищет подходящий бин (объект) в контексте приложения
                // и автоматически подставляет его в поле, метод или конструктор класса,
                // устраняет необходимость вручную создавать или передавать зависимости
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found with username: " + username));

        return build(user);
    }

    public User loadUserById(Long id) {
        return userRepository.findUserById(id).orElse(null);
    }

    public static User build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return new User(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
}
