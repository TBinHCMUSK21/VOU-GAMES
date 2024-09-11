package com.vou.app.service;

import com.vou.app.entity.User;
import com.vou.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Phương thức lưu thông tin người dùng
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Phương thức tìm người dùng theo clerkId
    public Optional<User> getUserByClerkId(String clerkId) {
//        Optional<User> user = userRepository.findByClerkId(clerkId);
//        System.out.println(user.getId().toString());
//        return user;
        return userRepository.findByClerkId(clerkId);
    }

    // Phương thức tìm người dùng theo userId
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // Phương thức tìm người dùng theo số điện thoại
    public Optional<User> getUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    // Phương thức tìm người dùng theo email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // get friends
    public Optional<User> getFriends(Long userId) {
        return userRepository.findById(userId);
    }

    // Phương thức kiểm tra xem hai người dùng có phải là bạn không
    public boolean isFriend(Long userId, Long friendId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> friend = userRepository.findById(friendId);
        if (user.isPresent() && friend.isPresent()) {
            return userRepository.isFriend(user.get().getId(), friend.get().getId());
        }
        return false;
    }
}

