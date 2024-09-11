package com.vou.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "clerk_id", length = 255, nullable = false)
    private String clerkId;

    @Column(name = "avatar", columnDefinition = "TEXT")
    private String avatar;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "dob", length = 255)
    private String dob;

    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "gender", length = 45)
    private String gender;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "phone_number", length = 45)
    private String phoneNumber;

    @Column(name = "role", length = 45)
    private String role;

    @Column(name = "username", length = 45)
    private String username;

    // Bidirectional relationship for friends
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserFriend> friends;

    // One-to-many for sent friend requests
    @OneToMany(mappedBy = "sender")
    @JsonIgnore // Prevent recursion with requests
    private List<FriendRequests> sentRequests = new ArrayList<>();

    // One-to-many for received friend requests
    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<FriendRequests> receivedRequests = new ArrayList<>();

    public User() {}

    public User(String clerkId, String avatar, LocalDateTime createdAt, String dob, String email, String gender, String name, String phoneNumber, String role, String username) {
        this.clerkId = clerkId;
        this.avatar = avatar;
        this.createdAt = createdAt;
        this.dob = dob;
        this.email = email;
        this.gender = gender;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.username = username;
    }

    // Adding friend using UserFriend entity
    public boolean addFriend(User friend) {
        if (!this.isFriendWith(friend)) {
            UserFriend userFriend = new UserFriend(this, friend);
            this.friends.add(userFriend);
            return true;
        }
        return false;
    }

    // Helper method to check if already friends
    public boolean isFriendWith(User friend) {
        return this.friends.stream()
                .anyMatch(userFriend -> userFriend.getFriend().equals(friend));
    }


    // Removing friend
    public void removeFriend(User friend) {
        if (this.friends.contains(friend)) {
            this.friends.remove(friend);
            friend.getFriends().remove(this); // Maintain bidirectional consistency
        }
    }

    // equals() and hashCode() methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
