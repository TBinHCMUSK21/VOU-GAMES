package com.vou.app.controller;

import com.sun.java.accessibility.util.EventID;
import com.vou.app.entity.Items;
import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.service.ItemService;
import com.vou.app.service.UserItemService;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private UserItemService userItemService;

    @PostMapping("/scroll/eventId/{eventId}/userId/{userId}")
    public ResponseEntity<Object> getItemToScroll(@PathVariable("eventId") Long EventID, @PathVariable("userId") Long UserID) {
        // get items that have event id
        List<Items> items = itemService.getItemByEventId(EventID);
        // roll random and return the item
        // Check if there are any items
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Roll a random item
        Random random = new Random();
        Items randomItem = items.get(random.nextInt(items.size()));
//        System.out.println("Random item: " + randomItem.getId());
        // save the item to the user
        UserItem userItem = userItemService.findUserItem(UserID, randomItem.getId());
//        System.out.println(userItem);
        if (userItem == null) {
            userItem = new UserItem(UserID,randomItem.getId(), 1, randomItem);
        } else {
            userItem.setQuantity(userItem.getQuantity() + 1);
        }
        System.out.println("" + userItem.getItems() + userItem.getQuantity());
        userItemService.saveUserItem(userItem);
        // Return the random item
        return ResponseEntity.ok(randomItem);
    }

}
