package com.monsha.incham.repository;

import com.monsha.incham.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // указывает, что интерфейс отвечает за хранилище
public interface UserRepository extends JpaRepository<User, Long> { // упрощает взаимодействие с базой данных, предоставляя абстракцию высокого уровня по сравнению с JPA
                                                     // класс User и тип id User
    Optional<User> findUserByUsername(String username); // Optional помогает избегать ошибки NullPointerException

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserById(Long id);
}
