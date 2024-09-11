package com.vou.app.service;

import com.vou.app.entity.EventGames;
import com.vou.app.entity.Events;
import com.vou.app.repository.EventGamesRepository;
import com.vou.app.repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventGamesRepository eventGamesRepository;

    @Autowired
    private EventsRepository eventsRepository;

    public Optional<Events> getEventStartTimeByEventGameId(Long eventgameId) {
        Optional<EventGames> eventGame = eventGamesRepository.findById(eventgameId);

        if (eventGame.isPresent()) {
            Events event = eventGame.get().getEvent();
            return Optional.of(event);
        }

        return Optional.empty();
    }
}
