package com.vou.app.service;

import com.vou.app.entity.*;
import com.vou.app.repository.EventGamesRepository;
import com.vou.app.repository.PlaySessionsRepository;
import com.vou.app.repository.ShakeUserRepository;
import com.vou.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PlaySessionsService {
    @Autowired
    private PlaySessionsRepository shakeUserRepository;
    @Autowired
    private EventGamesRepository eventGamesRepository;
    @Autowired
    private UserRepository userRepository;

    public PlaySessions createPlaySessions(final PlaySessionsRequest playSessionsRequest) {
        Optional<EventGames> eventGames = eventGamesRepository.findById(playSessionsRequest.getEventgameid());
        Optional<User> user = userRepository.findById(playSessionsRequest.getPlayerid());

        if (eventGames.isPresent() && user.isPresent()) {
            PlaySessions playSessions = PlaySessions
                    .builder()
                    .eventGames(eventGames.get())
                    .player(user.get())
                    .startTime(LocalDateTime.now())
                    .build();

            return shakeUserRepository.save(playSessions);
        }

        return null;
    }
}
