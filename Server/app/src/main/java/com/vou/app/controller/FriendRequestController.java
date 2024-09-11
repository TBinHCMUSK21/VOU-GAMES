package com.vou.app.controller;

import com.vou.app.dto.FriendRequestsDTO;
import com.vou.app.entity.FriendRequests;
import com.vou.app.entity.User;
import com.vou.app.service.FriendRequestsService;
import com.vou.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games/friend-requests")
public class FriendRequestController {
    @Autowired
    private FriendRequestsService friendRequestsService;

    @Autowired
    private UserService userService;

    // Send a friend request
    @PostMapping("/send")
    public ResponseEntity<String> sendFriendRequest(@RequestParam Long senderId,
                                                    @RequestParam String searchInput) {
        // Assume you have a method to find a user by ID
        User sender = findUserById(senderId);
        // check if seartchInput is a phone number or email
        User receiver = null;
        if(searchInput.contains("@"))
            receiver = userService.getUserByEmail(searchInput).orElse(null);
        else
            // Assume you have a method to find a user by PhoneNumber (implementation may vary
            receiver = findUserByPhoneNumber(searchInput);

        if (sender == null || receiver == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        friendRequestsService.sendFriendRequest(sender, receiver);
        return ResponseEntity.ok("Friend request sent successfully");
    }

    // Get friend requests for a specific user
    @GetMapping("/requests/sent/{userId}")
    public ResponseEntity<List<FriendRequestsDTO>> getSentFriendRequests(@PathVariable Long userId) {
        User user = findUserById(userId);

        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        List<FriendRequestsDTO> friendRequests = friendRequestsService.getSentFriendRequests(user);
        return ResponseEntity.ok(friendRequests);
    }

    // Get all friend requests sent to the user
    @GetMapping("/requests/received/{userId}")
    public ResponseEntity<List<FriendRequestsDTO>> getReceivedFriendRequests(@PathVariable Long userId) {
        User user = findUserById(userId);

        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        List<FriendRequestsDTO> friendRequests = friendRequestsService.getReceivedFriendRequests(user);
        return ResponseEntity.ok(friendRequests);
    }

    // update friend request
    @PostMapping("/{requestId}/{status}")
    public ResponseEntity<String> updateFriendRequest(@PathVariable Long requestId, @PathVariable String status) {
        if(status.equals("accept")) {
            return acceptFriendRequest(requestId);
        } else if(status.equals("deny")) {
            return declineFriendRequest(requestId);
        }
        return ResponseEntity.badRequest().body("Invalid status");
    }

    // Accept a friend request
    @PostMapping("/accept/{requestId}")
    public ResponseEntity<String> acceptFriendRequest(@PathVariable Long requestId) {
        Optional<FriendRequestsDTO> acceptedRequest = Optional.ofNullable(friendRequestsService.acceptFriendRequest(requestId));
        if (acceptedRequest.isPresent()) {
            return ResponseEntity.ok("Friend request accepted");
        } else {
            return ResponseEntity.badRequest().body("Friend request not found");
        }
    }

    // Decline a friend request
    @PostMapping("/decline/{requestId}")
    public ResponseEntity<String> declineFriendRequest(@PathVariable Long requestId) {
        FriendRequestsDTO declined = friendRequestsService.rejectFriendRequest(requestId);
        // If the request was declined, return a success message
        if(declined != null) {
            return ResponseEntity.ok("Friend request declined");
        }
        // If the request was not found, return a bad request
        return ResponseEntity.badRequest().body("Friend request not found");
    }

    // Helper method to find user by ID (implementation may vary)
    private User findUserById(Long userId) {
        // Assuming you have a UserService to fetch user by ID
        return userService.getUserById(userId).orElse(null);
    }

    // Helper method to find user by PhoneNumber (implementation may vary)
    private User findUserByPhoneNumber(String PhoneNumber) {
        // Assuming you have a UserService to fetch user by PhoneNumber
        return userService.getUserByPhoneNumber(PhoneNumber).orElse(null);
    }
}
