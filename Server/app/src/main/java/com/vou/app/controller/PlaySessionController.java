package com.vou.app.controller;

import com.vou.app.entity.PlaySessions;
import com.vou.app.entity.PlaySessionsRequest;
import com.vou.app.service.PlaySessionsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/playsessions")
@RequiredArgsConstructor
public class PlaySessionController {
    private final PlaySessionsService playSessionsService;

    @PostMapping
    public ResponseEntity<Long> addPlaySessions(@RequestBody final PlaySessionsRequest playSessionsRequest) {
        log.info("PlaySessionController | addPlaySessions");

        final PlaySessions createdPlaySessions = playSessionsService.createPlaySessions(playSessionsRequest);

        if (createdPlaySessions != null) {
            return ResponseEntity.ok(createdPlaySessions.getId());
        }

        return ResponseEntity.ok((long) -1);
    }
}
