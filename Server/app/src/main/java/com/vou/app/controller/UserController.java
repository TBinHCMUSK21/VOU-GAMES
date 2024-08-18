package com.vou.app.controller;

import com.vou.app.entity.User;
import com.vou.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody Map<String, Object> payload) {

        String clerkId = (String) payload.get("clerkId");
        String avatar = (String) payload.get("avatar");
        String createdAtStr = (String) payload.get("createdAt");
        String dob = (String) payload.get("dob");
        String email = (String) payload.get("email");
        String gender = (String) payload.get("gender");
        String name = (String) payload.get("name");
        String phoneNumber = (String) payload.get("phoneNumber");
        String role = (String) payload.get("role");
        String username = (String) payload.get("username");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        ZonedDateTime zonedDateTime = ZonedDateTime.parse(createdAtStr, formatter);
        LocalDateTime createdAt = zonedDateTime.toLocalDateTime();

        User user = new User();
        user.setClerkId(clerkId);
        user.setAvatar(avatar);
        user.setCreatedAt(createdAt);
        user.setDob(dob);
        user.setEmail(email);
        user.setGender(gender);
        user.setName(name);
        user.setPhoneNumber(phoneNumber);
        user.setRole(role);
        user.setUsername(username);

        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User saved successfully");
    }
}
