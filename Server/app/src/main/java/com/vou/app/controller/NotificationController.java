package com.vou.app.controller;

import com.vou.app.entity.Notification;
import com.vou.app.entity.NotificationRequest;
import com.vou.app.service.NotificationsService;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Validated
public class NotificationController {
    private final NotificationsService notificationsService;

    @PostMapping
    public ResponseEntity<Long> addNotification(@RequestBody final NotificationRequest notification) {
        log.info("NotificationController | addNotification");
        log.info("eventId:" + notification.getEventId());
        log.info("playerId: " + notification.getPlayerId());
        final Notification createdNotification = notificationsService.addNotification(notification);

        if (createdNotification != null) {
            return ResponseEntity.ok(createdNotification.getId());
        }

        return ResponseEntity.ok((long) -1);
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteNotification(@RequestParam Long eventId, @RequestParam Long playerId) {
        log.info("NotificationController | deleteNotification");

        notificationsService.deleteNotification(eventId, playerId);

        return ResponseEntity.ok().build();
    }
}
