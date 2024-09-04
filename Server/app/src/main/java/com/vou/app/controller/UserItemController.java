package com.vou.app.controller;

import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.service.ItemService;
import com.vou.app.service.UserItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user-items")
public class UserItemController {
    @Autowired
    private UserItemService userItemService;

    // Get item from user id and event id
    @PostMapping
    public ResponseEntity<String> getUserItems(@RequestBody Map<String, Object> payload) {
        // get user id and item id from the request
        int userID = (int) payload.get("userID");
        int itemID = (int) payload.get("itemID");
        UserItemsId id = new UserItemsId(userID, itemID);
        // return quantity of the item
        return ResponseEntity.ok(userItemService.getItem(id).getQuantity()+ "");
    }
}
