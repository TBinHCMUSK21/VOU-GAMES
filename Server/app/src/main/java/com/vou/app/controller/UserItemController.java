package com.vou.app.controller;

import com.vou.app.entity.Items;
import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.service.ItemService;
import com.vou.app.service.UserItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/games/user-items")
public class UserItemController {
    @Autowired
    private UserItemService userItemService;

    // Get item from user id and event id
    @GetMapping("/user/{userId}/event/{eventId}")
    public ResponseEntity<List<UserItem>> getUserItemsByUserAndEvent(
            @PathVariable Long userId, @PathVariable Long eventId) {

        List<UserItem> userItems = userItemService.getUserItemsByUserAndEvent(userId, eventId);
        return ResponseEntity.ok(userItems);
    }
}
