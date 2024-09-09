package com.vou.app.service;

import com.vou.app.entity.Games;
import com.vou.app.repository.EventGamesRepository;
import com.vou.app.repository.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GamesService {
    @Autowired
    private GamesRepository gamesRepository;

    public GamesService() {
    }
    
    public List<Games> getGames() {
        return gamesRepository.findAll();
    }
    
    public Games getGameById(Long id) {
        return gamesRepository.findById(id).orElse(null);
    }
}
