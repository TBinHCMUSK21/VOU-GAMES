package com.vou.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_results")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Sửa tên từ gameId thành eventGameId để phản ánh đúng tên cột trong bảng
    @Column(name = "eventgameid", nullable = false)
    private Long eventGameId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "score", nullable = false)
    private int score;

    // Backticks vì 'rank' là từ khóa của SQL
    @Column(name = "`rank`", nullable = false)
    private int rank;

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventGameId() {
        return eventGameId;
    }

    public void setEventGameId(Long eventGameId) {
        this.eventGameId = eventGameId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }
}
