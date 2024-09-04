package com.vou.app.repository;

import com.vou.app.entity.EventGames;
import com.vou.app.entity.EventGamesKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventGamesRepository extends JpaRepository<EventGames, EventGamesKey> {
    // Custom query methods for EventGames can be added here if needed
}
