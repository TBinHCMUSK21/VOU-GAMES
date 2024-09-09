package com.vou.app.entity;

import lombok.Getter;

@Getter
public class ShakeUserRequest {
    private Long eventgameid;
    private Long playerid;
    private Integer quantity;
}
