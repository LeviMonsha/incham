package com.monsha.incham.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.monsha.incham.entity.enums.ERole;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;

@Data // автоматически создает геттеры и сеттеры
@Entity
@Table(name = "`user`")
public class User implements UserDetails {

    @Id // указывает, что поле является идентификатором для сущности
            // Hibernate будет использовать это поле для поиска записей в базе данных
    @GeneratedValue(strategy = GenerationType.IDENTITY) // определяет стратегию автоматической генерации значений идентификатора
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(unique = true, updatable = false)
    private String username;
    @Column(nullable = false)
    private String lastname;
    @Column(unique = true)
    private String email;
    @Column(columnDefinition = "text")
    private String bio;
    @Column(length = 3000)
    private String password;

    // определяет связь "один ко многим" между сущностью, содержащей это поле,
    // и коллекцией объектов типа ERole
    @ElementCollection(targetClass = ERole.class)
    @CollectionTable(name = "user_role",
        joinColumns = @JoinColumn(name = "user_id")) // определяет таблицу базы данных,
                                            // которая будет использоваться для хранения коллекции roles
    private Set<ERole> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, // когда удалим пользователя все посты, которые относятся к нему будут удалены
            fetch = FetchType.LAZY, // не нужно получать из БД все посты, когда пытаемся получить данные пользователя
                                    // будем получать посты, когда сами захотим
            mappedBy = "user", // user является владельцем связи
            orphanRemoval = true) // если пост больше не ссылается на пользователя, он будет автоматически удален из базы данных
    private List<Post> posts = new ArrayList<>();
    @JsonFormat(pattern = "yyyy-mm-dd HH:mm:ss")
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @Transient // указывает, что поле или свойство сущности не должно быть сохранено в базе данных
    private Collection<? extends GrantedAuthority> authorities;

    public User() {

    }

    public User(Long id, String username, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    @PrePersist // задает значение атрибута до того,
                    // как будет сделана запись в БД
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

    /**
     *
     * SECURITY
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
//        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
//        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
//        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return true;
//        return UserDetails.super.isEnabled();
    }
}
