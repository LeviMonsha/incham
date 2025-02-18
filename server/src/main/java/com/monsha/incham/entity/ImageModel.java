package com.monsha.incham.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Lob // указывает, что поле должно быть сохранено как Large Object (LOB) в базе данных
    @Column(columnDefinition = "bytea")
    private byte[] imageBytes;
    @JsonIgnore // поле не будет включено в полученный вывод JSON
    private Long userId;
    @JsonIgnore
    private Long postId;
}
