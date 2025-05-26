package com.monsha.incham.repository;

import com.monsha.incham.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    List<User> findAllByEmail(String email);

    List<User> findAllByUsername(String username);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.isDarkTheme = :isDarkTheme WHERE u.username = :username")
    void updateUserTheme(@Param("username") String username, @Param("isDarkTheme") boolean isDarkTheme);

    long count();

    @Query("SELECT COUNT(u) FROM User u WHERE u.created >= :lastMonthDate")
    long countUsersSince(@Param("lastMonthDate") LocalDate lastMonthDate);

    Optional<User> findTopByOrderByIdDesc();

    List<User> findAllByLastName(String lastName);

    Optional<User> findUserByUsername(String username);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserById(Long userId);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
