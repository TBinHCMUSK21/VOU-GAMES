package com.vou.app.service;


import com.vou.app.entity.PlaySession;
import com.vou.app.repository.PlaySessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class PlaySessionService {

    @Autowired
    private PlaySessionRepository playSessionRepository;

    public boolean updateEndTime(Long gameId, String userId, String endTimeStr) {
        Optional<PlaySession> playSessionOpt = playSessionRepository.findByGameIdAndPlayerId(gameId, userId);
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
