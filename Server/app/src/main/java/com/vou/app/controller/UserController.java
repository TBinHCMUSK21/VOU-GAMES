package com.vou.app.controller;

import com.vou.app.entity.User;
import com.vou.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/games/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody Map<String, Object> payload) {

        String clerkId = (String) payload.get("clerkId");
        String avatar = (String) payload.get("avatar");
        String createdAtStr = (String) payload.get("createdAt");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        LocalDateTime createdAt = ZonedDateTime.parse(createdAtStr, formatter).toLocalDateTime();
        String dob = (String) payload.get("dob");
        String email = (String) payload.get("email");
        String gender = (String) payload.get("gender");
        String name = (String) payload.get("name");
        String phoneNumber = (String) payload.get("phoneNumber");
        String role = (String) payload.get("role");
        String username = (String) payload.get("username");

        User user = new User(clerkId, avatar, createdAt, dob, email, gender, name, phoneNumber, role, username);

        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User saved successfully");
    }

    @GetMapping
    public ResponseEntity<?> getUserById(@RequestParam String userId) {
        Optional<User> user = userService.getUserByClerkId(userId);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/info")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username) {
        Optional<User> user = userService.getUserByUsername(username);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // get friends
    @GetMapping("/{userId}/friends")
    public ResponseEntity<?> getFriends(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getFriends());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No friends found");
        }
    }
}