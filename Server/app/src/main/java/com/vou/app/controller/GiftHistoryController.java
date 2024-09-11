package com.vou.app.controller;

import com.vou.app.entity.GiftHistory;
import com.vou.app.service.GiftHistoryService;
import com.vou.app.service.UserItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/games/gift-history")
public class GiftHistoryController {

    @Autowired
    private GiftHistoryService giftHistoryService;

    @Autowired
    private UserItemService userItemService;

    @PostMapping("/add")
    public ResponseEntity<GiftHistory> addGiftHistory(
            @RequestParam Long giverId,
            @RequestParam Long receiverId,
            @RequestParam Long itemId,
            @RequestParam Long eventGameId) {

        GiftHistory giftHistory = giftHistoryService.saveGiftHistory(giverId, receiverId, itemId, eventGameId);
        // change quantity of user item
        userItemService.adjustQuantity(receiverId, itemId, 1);
        userItemService.adjustQuantity(giverId, itemId, -1);

        return ResponseEntity.ok(giftHistory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GiftHistory> getGiftHistory(@PathVariable Long id) {
        Optional<GiftHistory> giftHistory = giftHistoryService.findById(id);
        return giftHistory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add other endpoints as necessary
}
