package com.vou.app.controller;

import com.vou.app.dto.PlaySessionUpdateRequest;
import com.vou.app.entity.PlaySession;
import com.vou.app.entity.PlaySessionsRequest;
import com.vou.app.service.PlaySessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/playsessions")
@RequiredArgsConstructor
public class PlaySessionController {
    private final PlaySessionService playSessionService;

    @PostMapping
    public ResponseEntity<Long> addPlaySessions(@RequestBody final PlaySessionsRequest playSessionsRequest) {
        log.info("PlaySessionController | addPlaySessions");

        final PlaySession createdPlaySessions = playSessionService.createPlaySessions(playSessionsRequest);

        if (createdPlaySessions != null) {
            return ResponseEntity.ok(createdPlaySessions.getId());
        }

        return ResponseEntity.ok((long) -1);
    }

    @PutMapping("/end")
    public ResponseEntity<String> updateEndTime(@RequestBody PlaySessionUpdateRequest request) {
        boolean isUpdated = playSessionService.updateEndTime(request.getEventgameId(), request.getUserId(), request.getEndTime());
        System.out.println("isUpdated: " + isUpdated);
        if (isUpdated) {
            return ResponseEntity.ok("Thời gian kết thúc đã được cập nhật.");
        } else {
            return ResponseEntity.badRequest().body("Không thể cập nhật thời gian kết thúc.");
        }
    }
}
