package com.vou.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "play_turn_requests")
public class PlayTurnRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false)
    private User friend;

    @Column(name = "event_game_id", nullable = false)
    private Long eventGameId;

    @Column(nullable = false)
    private String status; // PENDING, ACCEPTED, DECLINED

    // Constructors, getters, setters
    public PlayTurnRequest() {
    }

    public PlayTurnRequest(User user, User friend, Long eventGameId, String status) {
        this.user = user;
        this.friend = friend;
        this.eventGameId = eventGameId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getFriend() {
        return friend;
    }

    public void setFriend(User friend) {
        this.friend = friend;
    }

    public Long getEventGameId() {
        return eventGameId;
    }

    public void setEventGameId(Long eventGameId) {
        this.eventGameId = eventGameId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
