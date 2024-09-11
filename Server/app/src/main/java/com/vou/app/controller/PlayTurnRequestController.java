package com.vou.app.controller;

import com.vou.app.entity.PlayTurnRequest;
import com.vou.app.service.PlayTurnRequestService;
import com.vou.app.service.ShakeUserService;
import com.vou.app.service.UserService; // Assuming you have a UserService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games/play-turn-requests")
public class PlayTurnRequestController {

    @Autowired
    private PlayTurnRequestService playTurnRequestService;

    @Autowired
    private UserService userService; // Assuming you have a UserService

    @Autowired
    private ShakeUserService shakeUserService; // Assuming you have a ShakeUserService

    @PostMapping("/request")
    public ResponseEntity<String> requestPlayTurn(
            @RequestParam Long senderId,
            @RequestParam Long receiverId,
            @RequestParam Long eventGameId) {

//        // Check if user and friend are actually friends
//        boolean isFriend = userService.isFriend(senderId, receiverId);
//        if (!isFriend) {
//            return ResponseEntity.badRequest().body("Not friends with this user");
//        }
        PlayTurnRequest playTurnRequest = new PlayTurnRequest();
        playTurnRequest.setUser(userService.getUserById(senderId).orElseThrow());
        playTurnRequest.setFriend(userService.getUserById(receiverId).orElseThrow());
        playTurnRequest.setEventGameId(eventGameId);
        playTurnRequest.setStatus("PENDING");

        playTurnRequestService.save(playTurnRequest);

        return ResponseEntity.ok("Play turn request sent");
    }

    @PostMapping("/respond")
    public ResponseEntity<String> respondToPlayTurnRequest(
            @RequestParam Long requestId,
            @RequestParam String responseString) {

        Optional<PlayTurnRequest> playTurnRequestOpt = playTurnRequestService.findById(requestId);
        if (!playTurnRequestOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Request not found");
        }

        PlayTurnRequest playTurnRequest = playTurnRequestOpt.get();
        if ("ACCEPTED".equals(responseString)) {
            // Logic to increase play turns should be here
            playTurnRequest.setStatus("ACCEPTED");
            // Increase play turns
            shakeUserService.adjustQuantity(playTurnRequest.getUser().getId(),
                    playTurnRequest.getEventGameId(),1);
            System.out.println("Play turns increased");
            // Decrease play turns for current user
            shakeUserService.adjustQuantity(playTurnRequest.getFriend().getId(),
                    playTurnRequest.getEventGameId(),-1);
            System.out.println("Play turns decreased");
        } else {
            playTurnRequest.setStatus("DECLINED");
        }
        playTurnRequestService.save(playTurnRequest);
        return ResponseEntity.ok("Response recorded");
    }

    // increase play turns when share is clicked
    @PostMapping("/share")
    public ResponseEntity<String> sharePlayTurn(
            @RequestParam Long userId,
            @RequestParam Long eventGameId) {
        shakeUserService.adjustQuantity(userId, eventGameId, 1);
        return ResponseEntity.ok("Play turns increased");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlayTurnRequest>> getRequestsForUser(@PathVariable Long userId) {
        List<PlayTurnRequest> requests = playTurnRequestService.findByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    // This method is used to get requests received and from event game id
    @GetMapping("/received/user/{userId}/event-game/{eventGameId}")
    public ResponseEntity<List<PlayTurnRequest>> getRequestsForUserAndEventGame(@PathVariable Long userId, @PathVariable Long eventGameId) {
        List<PlayTurnRequest> requests = playTurnRequestService.findByFriendIdAndEventGameIdAndStatus(userId, eventGameId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/friend/{friendId}")
    public ResponseEntity<List<PlayTurnRequest>> getRequestsFromFriend(@PathVariable Long friendId) {
        List<PlayTurnRequest> requests = playTurnRequestService.findByFriendId(friendId);
        return ResponseEntity.ok(requests);
    }
}
