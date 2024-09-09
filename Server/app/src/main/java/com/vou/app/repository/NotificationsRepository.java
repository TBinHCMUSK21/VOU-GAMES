package com.vou.app.repository;

import com.vou.app.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface NotificationsRepository extends JpaRepository<Notification, Long> {
    @Transactional
    void deleteByEventIdAndPlayerId(Long eventId, Long playerId);
}
