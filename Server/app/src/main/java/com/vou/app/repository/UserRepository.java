package com.vou.app.repository;

import com.vou.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByClerkId(String clerkId);
    Optional<User> findByUsername(@Param("username") String username);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> findByEmail(String email);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END " +
            "FROM User u JOIN u.friends f WHERE u.id = :userId AND f.id = :friendId")
    boolean isFriend(@Param("userId") Long userId, @Param("friendId") Long friendId);
}