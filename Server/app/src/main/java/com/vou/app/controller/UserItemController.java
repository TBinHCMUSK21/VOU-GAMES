package com.vou.app.controller;

import com.vou.app.entity.EventGames;
import com.vou.app.entity.Items;
import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.service.EventGamesService;
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

    @Autowired
    private EventGamesService eventGamesService;

    // Get item from user id and event id
    @GetMapping("/user/{userId}/event/{eventGameId}")
    public ResponseEntity<List<UserItem>> getUserItemsByUserAndEvent(
            @PathVariable Long userId, @PathVariable Long eventGameId) {
        EventGames eventGame = eventGamesService.findEventGameById(eventGameId);
        Long eventId = eventGame.getEvent().getId();

        List<UserItem> userItems = userItemService.getUserItemsByUserAndEvent(userId, eventId);
        return ResponseEntity.ok(userItems);
    }
}
