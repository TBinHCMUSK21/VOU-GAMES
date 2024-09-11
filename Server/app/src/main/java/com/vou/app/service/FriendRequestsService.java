package com.vou.app.service;

import com.vou.app.dto.FriendRequestsDTO;
import com.vou.app.entity.FriendRequests;
import com.vou.app.entity.User;
import com.vou.app.repository.FriendRequestRepository;
import com.vou.app.repository.UserFriendRepository;
import com.vou.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendRequestsService {

    @Autowired
    private FriendRequestRepository friendRequestsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserFriendService userFriendService;

    // Send a friend request
    public FriendRequestsDTO sendFriendRequest(User sender, User receiver) {
        FriendRequests friendRequest = new FriendRequests(sender, receiver, "PENDING");
        FriendRequests savedRequest = friendRequestsRepository.save(friendRequest);
        return convertToDTO(savedRequest);
    }

    // Accept a friend request
    public FriendRequestsDTO acceptFriendRequest(Long requestId) {
        Optional<FriendRequests> optionalRequest = friendRequestsRepository.findById(requestId);
        if (optionalRequest.isPresent()) {
            FriendRequests friendRequest = optionalRequest.get();
            friendRequest.setStatus("ACCEPTED");
            FriendRequests updatedRequest = friendRequestsRepository.save(friendRequest);
            // Add sender and receiver to each other's friends list
            User sender = friendRequest.getSender();
            User receiver = friendRequest.getReceiver();

            // Add each other as friends with UserFriend class

            userFriendService.addFriend(sender, receiver);

            // Save the updated users to persist the relationship
            // check if they are already friends

            return convertToDTO(updatedRequest);
        }
        throw new RuntimeException("Friend request not found");
    }

    // Reject a friend request
    public FriendRequestsDTO rejectFriendRequest(Long requestId) {
        Optional<FriendRequests> optionalRequest = friendRequestsRepository.findById(requestId);
        if (optionalRequest.isPresent()) {
            FriendRequests friendRequest = optionalRequest.get();
            friendRequest.setStatus("REJECTED");
            FriendRequests updatedRequest = friendRequestsRepository.save(friendRequest);
            return convertToDTO(updatedRequest);
        }
        throw new RuntimeException("Friend request not found");
    }

    // Get all friend requests for a user (either sent or received)
    public List<FriendRequestsDTO> getFriendRequestsForUser(User user) {
        List<FriendRequests> requests = friendRequestsRepository.findBySenderAndReceiver(user, user);
        return requests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get all friend requests sent to a user
    public List<FriendRequestsDTO> getReceivedFriendRequests(User user) {
        List<FriendRequests> requests = friendRequestsRepository.findByReceiverAndStatus(user, "PENDING");
        return requests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get all friend requests sent by a user
    public List<FriendRequestsDTO> getSentFriendRequests(User user) {
        List<FriendRequests> requests = friendRequestsRepository.findBySenderAndStatus(user, "PENDING");
        return requests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Delete a friend request (cancel or remove)
    public void deleteFriendRequest(Long requestId) {
        friendRequestsRepository.deleteById(requestId);
    }

    // Convert FriendRequests entity to DTO
    private FriendRequestsDTO convertToDTO(FriendRequests request) {
        return new FriendRequestsDTO(
                request.getId(),
                request.getSender().getId(),
                request.getSender().getName(), // Or any other field you need
                request.getReceiver().getId(),
                request.getReceiver().getName(), // Or any other field you need
                request.getStatus()
        );
    }
}