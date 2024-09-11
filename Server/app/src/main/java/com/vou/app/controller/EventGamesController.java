package com.vou.app.controller;

import com.vou.app.entity.EventGames;
import com.vou.app.entity.Events;
import com.vou.app.service.EventGamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/games/eventgames")
public class EventGamesController {
    @Autowired
    private EventGamesService eventGamesService;
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventGames>> getGamesByEventId(@PathVariable Long eventId) {
        List<EventGames> games = eventGamesService.findGamesByEventId(eventId);
        return ResponseEntity.ok(games);
    }

    // get event from event game id
    @GetMapping("/get-event/{eventGameId}")
    public ResponseEntity<Events> getEventByEventGameId(@PathVariable Long eventGameId) {
        EventGames event = eventGamesService.findEventGameById(eventGameId);
        Events events = event.getEvent();
        return ResponseEntity.ok(events);
    }
}
