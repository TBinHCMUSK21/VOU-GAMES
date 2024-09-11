package com.vou.app.controller;

import com.vou.app.entity.Games;
import com.vou.app.entity.GamesResponse;
import com.vou.app.service.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/games/games")
public class GamesController {
    // get info about games
    @Autowired
    private GamesService gamesService;

    public GamesController(GamesService gamesService) {
        this.gamesService = gamesService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GamesResponse> getGameDetails(@PathVariable Long id) {
        Games game = gamesService.getGameById(id);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }

        // Create the DTO with the necessary fields
        GamesResponse response = new GamesResponse(
                game.getId(),
                game.getName(),
                game.getDescription(),
                game.getInstructions()
        );

        return ResponseEntity.ok(response);
    }
}
