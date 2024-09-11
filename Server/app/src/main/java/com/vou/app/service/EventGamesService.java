package com.vou.app.service;

import com.vou.app.entity.EventGames;
import com.vou.app.repository.EventGamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventGamesService {
    @Autowired
    private EventGamesRepository eventGamesRepository;
    public List<EventGames> findGamesByEventId(Long eventId) {
        return eventGamesRepository.findGamesByEventId(eventId);
    }

    public EventGames findEventGameById(Long eventGameId) {
        return eventGamesRepository.findById(eventGameId).orElse(null);
    }
}
