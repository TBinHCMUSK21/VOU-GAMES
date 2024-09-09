package com.vou.app.repository;

import com.vou.app.entity.PlaySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaySessionRepository extends JpaRepository<PlaySession, Long> {

    @Query("SELECT ps FROM PlaySession ps WHERE ps.eventGames.id = :eventgameid AND ps.player.id = :playerid")
    Optional<PlaySession> findByEventGameIdAndPlayerId(@Param("eventgameid") Long eventgameid, @Param("playerid") Long playerid);

}
