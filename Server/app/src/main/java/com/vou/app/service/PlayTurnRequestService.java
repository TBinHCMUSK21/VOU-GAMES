package com.vou.app.service;

import com.vou.app.entity.PlayTurnRequest;
import com.vou.app.repository.PlayTurnRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayTurnRequestService {

    @Autowired
    private PlayTurnRequestRepository playTurnRequestRepository;

    public PlayTurnRequest save(PlayTurnRequest playTurnRequest) {
        return playTurnRequestRepository.save(playTurnRequest);
    }

    public Optional<PlayTurnRequest> findById(Long id) {
        return playTurnRequestRepository.findById(id);
    }

    public List<PlayTurnRequest> findByUserId(Long userId) {
        return playTurnRequestRepository.findByUserId(userId);
    }

    public List<PlayTurnRequest> findByFriendId(Long friendId) {
        return playTurnRequestRepository.findByFriendId(friendId);
    }
    // STATUS = "PENDING
    public List<PlayTurnRequest> findByFriendIdAndEventGameIdAndStatus(Long userId,
                                                                     Long eventGameId) {

        return playTurnRequestRepository.findByFriendIdAndEventGameIdAndStatus(userId, eventGameId, "PENDING");
    }
}
