package com.vou.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaySessionUpdateRequest {
    private Long eventgameId;
    private Long userId;
    private String endTime;
}