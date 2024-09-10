package com.vou.app.controller;

import com.vou.app.entity.ShakeUser;
import com.vou.app.entity.ShakeUserRequest;
import com.vou.app.service.ShakeUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/games/shakeuser")
@RequiredArgsConstructor
public class ShakeUserController {
    private final ShakeUserService shakeUserService;

    @PostMapping
    public ResponseEntity<Long> addShakeUser(@RequestBody final ShakeUserRequest shakeUserRequest) {
        log.info("ShakeUserController | addShakeUser");

        final ShakeUser createdShakeUser = shakeUserService.createShakeUser(shakeUserRequest);

        if (createdShakeUser != null) {
            return ResponseEntity.ok(createdShakeUser.getId());
        }

        return ResponseEntity.ok((long) -1);
    }
}
