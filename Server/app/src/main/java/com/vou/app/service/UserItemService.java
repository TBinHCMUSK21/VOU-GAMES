package com.vou.app.service;

import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserItemService {
    @Autowired
    private UserItemRepository userItemRepository;

    public UserItemService() {
    }

    // Get item from user id and event id
    public UserItem getItem(UserItemsId userItemID) {
        return userItemRepository.findById(userItemID).orElse(null);
    }

}
