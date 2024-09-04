package com.vou.app.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class EventGames {

    @EmbeddedId
    private EventGamesKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eventid", insertable = false, updatable = false)
    private Events event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gameid", insertable = false, updatable = false)
    private Games game;

    // Constructors, getters, and setters

    public EventGames() {}

    public EventGames(EventGamesKey id, Events event, Games game) {
        this.id = id;
        this.event = event;
        this.game = game;
    }

    public EventGamesKey getId() {
        return id;
    }

    public void setId(EventGamesKey id) {
        this.id = id;
    }

    public Events getEvent() {
        return event;
    }

    public void setEvent(Events event) {
        this.event = event;
    }

    public Games getGame() {
        return game;
    }

    public void setGame(Games game) {
        this.game = game;
    }
}


