package com.vou.app.repository;

import com.vou.app.entity.PlayTurnRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayTurnRequestRepository extends JpaRepository<PlayTurnRequest, Long> {

    List<PlayTurnRequest> findByUserId(Long userId);

    List<PlayTurnRequest> findByFriendId(Long friendId);

    List<PlayTurnRequest> findByFriendIdAndEventGameId(Long userId, Long eventGameId);

    List<PlayTurnRequest> findByFriendIdAndEventGameIdAndStatus(Long userId, Long eventGameId, String status);
}
