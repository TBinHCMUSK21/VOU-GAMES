package com.vou.app.repository;

import com.vou.app.entity.FriendRequests;
import com.vou.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequests, Long> {
    List<FriendRequests> findBySenderAndReceiver(User sender, User receiver);
    List<FriendRequests> findByReceiverAndStatus(User receiver, String status);
    List<FriendRequests> findBySenderAndStatus(User sender, String status);
}
