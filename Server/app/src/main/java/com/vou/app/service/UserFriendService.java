package com.vou.app.service;

import com.vou.app.entity.User;
import com.vou.app.entity.UserFriend;
import com.vou.app.repository.UserFriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFriendService {

    @Autowired
    private UserFriendRepository userFriendRepository;

    public boolean addFriend(User user, User friend) {
        if (userFriendRepository.findByUserAndFriend(user, friend) == null) {
            UserFriend userFriend = new UserFriend(user, friend);
            userFriendRepository.save(userFriend);
            UserFriend userFriend2 = new UserFriend(friend, user);
            userFriendRepository.save(userFriend2);
            return true;
        }
        return false;
    }

    public void removeFriend(User user, User friend) {
        UserFriend userFriend = userFriendRepository.findByUserAndFriend(user, friend);
        if (userFriend != null) {
            userFriendRepository.delete(userFriend);
        }
    }

    // get all friends from user
    public List<User> getFriends(User user) {
        return userFriendRepository.findFriendsByUser(user);
    }
}
