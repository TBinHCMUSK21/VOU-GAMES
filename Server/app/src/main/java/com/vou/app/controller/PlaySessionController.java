package com.vou.app.controller;


import com.vou.app.dto.PlaySessionUpdateRequest;
import com.vou.app.service.PlaySessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/playsessions")
public class PlaySessionController {

    @Autowired
    private PlaySessionService playSessionService;

    @PutMapping("/end")
    public ResponseEntity<String> updateEndTime(@RequestBody PlaySessionUpdateRequest request) {
        boolean isUpdated = playSessionService.updateEndTime(request.getGameId(), request.getUserId(), request.getEndTime());
        if (isUpdated) {
            return ResponseEntity.ok("Thời gian kết thúc đã được cập nhật.");
        } else {
            return ResponseEntity.badRequest().body("Không thể cập nhật thời gian kết thúc.");
        }
    }
}
