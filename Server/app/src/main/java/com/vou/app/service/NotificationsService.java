package com.vou.app.service;

import com.vou.app.entity.Events;
import com.vou.app.entity.Notification;
import com.vou.app.entity.NotificationRequest;
import com.vou.app.entity.User;
import com.vou.app.repository.EventsRepository;
import com.vou.app.repository.NotificationsRepository;
import com.vou.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificationsService {
    @Autowired
    private NotificationsRepository notificationsRepository;
    @Autowired
    private EventsRepository eventsRepository;
    @Autowired
    private UserRepository userRepository;

    public NotificationsService() {
    }

    public Notification addNotification(NotificationRequest notificationRequest) {
        Optional<Events> event = eventsRepository.findById(notificationRequest.getEventId());
        Optional<User> user = userRepository.findById(notificationRequest.getPlayerId());

        Notification notification = Notification
                                    .builder()
                                    .event(event.get())
                                    .player(user.get())
                                    .build();

        Notification result = notificationsRepository.save(notification);

        return result;
    }

    public void deleteNotification(Long eventId, Long playerId) {
        notificationsRepository.deleteByEventIdAndPlayerId(eventId, playerId);
    }
}
