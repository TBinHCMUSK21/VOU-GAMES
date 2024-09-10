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

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

