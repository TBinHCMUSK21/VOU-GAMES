package com.vou.app.entity;

import lombok.Getter;

@Getter
public class ShakeUserRequest {
    private Long eventgameid;
    private Long playerid;
    private Integer quantity;

    public ShakeUserRequest() {
    }

    public ShakeUserRequest(Long eventgameid, Long playerid, Integer quantity) {
        this.eventgameid = eventgameid;
        this.playerid = playerid;
        this.quantity = quantity;
    }

    public Long getEventgameid() {
        return eventgameid;
    }


    public Long getPlayerid() {
        return playerid;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setEventgameid(Long eventgameid) {
        this.eventgameid = eventgameid;
    }

    public void setPlayerid(Long playerid) {
        this.playerid = playerid;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
