package com.vou.app.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EventGamesKey implements Serializable {

    private Long eventid;
    private Long gameid;

    // Constructors, getters, setters, equals, and hashCode

    public EventGamesKey() {}

    public EventGamesKey(Long eventid, Long gameid) {
        this.eventid = eventid;
        this.gameid = gameid;
    }

    public Long getEventid() {
        return eventid;
    }

    public void setEventid(Long eventid) {
        this.eventid = eventid;
    }

    public Long getGameid() {
        return gameid;
    }

    public void setGameid(Long gameid) {
        this.gameid = gameid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventGamesKey that = (EventGamesKey) o;
        return Objects.equals(eventid, that.eventid) &&
                Objects.equals(gameid, that.gameid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventid, gameid);
    }
}

