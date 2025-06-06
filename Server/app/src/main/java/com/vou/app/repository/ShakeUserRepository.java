package com.vou.app.repository;

import com.vou.app.entity.ShakeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShakeUserRepository extends JpaRepository<ShakeUser, Long> {
    Optional<ShakeUser> findByPlayerIdAndEventGamesId(Long playerId, Long eventGamesId);
}
