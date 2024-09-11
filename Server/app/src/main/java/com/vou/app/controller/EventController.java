package com.vou.app.controller;

import com.vou.app.entity.Events;
import com.vou.app.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.Duration;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/games/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/start-time/{eventgameId}")
    public ResponseEntity<?> getEventStartTime(@PathVariable Long eventgameId) {
        log.info("EventController | getEventStartTime");
        Optional<Events> eventOptional = eventService.getEventStartTimeByEventGameId(eventgameId);

        if (eventOptional.isPresent()) {
            Events event = eventOptional.get();
            LocalDateTime startTime = event.getStartTime();
            LocalDateTime currentTime = LocalDateTime.now();

            if (currentTime.isBefore(startTime)) {
                Duration duration = Duration.between(currentTime, startTime);

                long hoursUntilStart = duration.toHours();
                long minutesUntilStart = duration.toMinutes() % 60;

                String timeMessage = "Sự kiện chưa bắt đầu. Còn "
                        + hoursUntilStart + " giờ "
                        + minutesUntilStart + " phút nữa.";

                return ResponseEntity.ok().body(Map.of("message", timeMessage));
            }
            return ResponseEntity.ok().body(event);
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Event or EventGame not found"));
        }
    }
}
