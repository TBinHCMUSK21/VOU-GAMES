package com.vou.app.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "playsessions")
public class PlaySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "playerid", nullable = false)
    private String playerId;

    @Column(name = "gameid", nullable = false)
    private Long gameId;

    @Column(name = "startTime", nullable = false)
    private LocalDateTime startTime = LocalDateTime.now();

    @Column(name = "endTime")
    private LocalDateTime endTime;

    // Getters và Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}
