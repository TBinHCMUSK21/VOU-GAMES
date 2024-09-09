package com.vou.app.dto;

public class PlaySessionUpdateRequest {

    private Long eventGameId;
    private String userId;
    private String endTime;


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

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
