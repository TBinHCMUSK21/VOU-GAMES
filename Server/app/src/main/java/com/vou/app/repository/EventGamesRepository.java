package com.vou.app.repository;

import com.vou.app.entity.EventGames;
import com.vou.app.entity.EventGamesKey;
import com.vou.app.entity.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventGamesRepository extends JpaRepository<EventGames, Long> {
    @Query("SELECT eg FROM EventGames eg WHERE eg.event.id = :eventId")
    List<EventGames> findGamesByEventId(@Param("eventId") Long eventId);
}
