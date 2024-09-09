package com.vou.app.service;

import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserItemService {
    @Autowired
    private UserItemRepository userItemRepository;

    public UserItemService() {
    }

    // Get item from user id and event id
    public List<UserItem> getUserItemsByUserAndEvent(Long userId, Long eventId) {
        return userItemRepository.findUserItemsByUserAndEvent(userId, eventId);
    }

    public UserItem findUserItem(Long userId, Long itemId) {
        return userItemRepository.findById(new UserItemsId(userId, itemId)).orElse(null);
    }
    // save user item
    public void saveUserItem(UserItem userItem) {
        userItemRepository.save(userItem);
    }

}
