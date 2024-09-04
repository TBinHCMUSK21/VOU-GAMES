package com.vou.app.repository;

import com.vou.app.entity.Games;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamesRepository extends JpaRepository<Games, Long> {
    // You can add custom query methods here if needed
}

