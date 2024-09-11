package com.vou.app.service;

import com.vou.app.entity.Items;
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

    @Autowired
    private ItemService itemService;

    public UserItemService() {
    }

    // Get item from user id and event id
    public List<UserItem> getUserItemsByUserAndEvent(Long userId, Long eventId) {
        return userItemRepository.findUserItemsByUserAndEvent(userId, eventId);
    }

    public UserItem findUserItem(Long userId, Long itemId) {
        return userItemRepository.findUserItem(userId, itemId);
    }
    // save user item
    public void saveUserItem(UserItem userItem) {
        userItemRepository.save(userItem);
    }

    // adjust quantity of user item
    public void adjustQuantity(Long userId, Long itemId, int quantity) {
        UserItem userItem = findUserItem(userId, itemId);
        if (userItem != null) {
            System.out.println("UserItem found: " + userItem.getId() + " " + userItem.getQuantity() + " " + quantity);
            userItem.setQuantity(userItem.getQuantity() + quantity);
            saveUserItem(userItem);
        }
        else{
            System.out.println("UserItem not found: " + userId + " " + itemId + " " + quantity);
            Items item = itemService.getItem(itemId);
            UserItem newUserItem = new UserItem(userId, itemId, quantity,item);
            saveUserItem(newUserItem);
        }
    }

}
