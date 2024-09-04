package com.vou.app.controller;

import com.sun.java.accessibility.util.EventID;
import com.vou.app.entity.Items;
import com.vou.app.service.ItemService;
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

    @PostMapping("/scroll/{eventId}")
    public ResponseEntity<Object> getItemToScroll(@PathVariable("eventId") Long EventID) {
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

        // Return the random item
        return ResponseEntity.ok(randomItem);
    }

}
