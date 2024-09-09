package com.vou.app.service;

import com.vou.app.entity.*;
import com.vou.app.repository.EventGamesRepository;
import com.vou.app.repository.PlaySessionRepository;
import com.vou.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class PlaySessionService {
    @Autowired
    private PlaySessionRepository playSessionRepository;
    @Autowired
    private EventGamesRepository eventGamesRepository;
    @Autowired
    private UserRepository userRepository;

    public PlaySession createPlaySessions(final PlaySessionsRequest playSessionsRequest) {
        Optional<EventGames> eventGames = eventGamesRepository.findById(playSessionsRequest.getEventgameid());
        Optional<User> user = userRepository.findById(playSessionsRequest.getPlayerid());

        if (eventGames.isPresent() && user.isPresent()) {
            PlaySession playSession = PlaySession
                    .builder()
                    .eventGames(eventGames.get())
                    .player(user.get())
                    .startTime(LocalDateTime.now())
                    .build();

            return playSessionRepository.save(playSession);
        }

        return null;
    }

    public boolean updateEndTime(Long eventgameId, Long userId, String endTimeStr) {
        Optional<PlaySession> playSessionOpt = playSessionRepository.findByEventGameIdAndPlayerId(eventgameId, userId);
        if (playSessionOpt.isPresent()) {
            PlaySession playSession = playSessionOpt.get();

            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
            LocalDateTime endTime = LocalDateTime.parse(endTimeStr, formatter);

            playSession.setEndTime(endTime);
            playSessionRepository.save(playSession);
            return true;
        }
        return false;
    }
}