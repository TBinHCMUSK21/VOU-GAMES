package com.vou.app.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class MyApiController {

    @PostMapping("/my-api")
    public ResponseEntity<String> receive(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        System.out.println("Received message: " + message);
        return ResponseEntity.status(HttpStatus.OK).body("Message received successfully");
    }
}
