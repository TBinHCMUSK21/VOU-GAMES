package com.vou.app.repository;

import com.vou.app.entity.PlaySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaySessionRepository extends JpaRepository<PlaySession, Long> {
    Optional<PlaySession> findByEventGameIdAndPlayerId(Long eventgameId, Long playerId);
}
