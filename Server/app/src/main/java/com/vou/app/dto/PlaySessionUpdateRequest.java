package com.vou.app.dto;

import lombok.Getter;

@Getter
public class PlaySessionUpdateRequest {
    private Long eventgameId;
    private Long userId;
    private String endTime;
}