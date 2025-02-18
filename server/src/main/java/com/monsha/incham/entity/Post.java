package com.monsha.incham.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String caption;
    private String location;
    private Integer likes;

    @Column
    @ElementCollection(targetClass = String.class)
    private Set<String> likedUsers = new HashSet<>();
    @ManyToOne(fetch = FetchType.LAZY) // у множества постов может быть только один пользователь
    private User user;
    @OneToMany(cascade = CascadeType.REFRESH,
            fetch = FetchType.EAGER, // когда загружаем пост сразу видим комментарии
            mappedBy = "post", orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @PrePersist // задает значение атрибута до того,
    // как будет сделана запись в БД
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }
}
