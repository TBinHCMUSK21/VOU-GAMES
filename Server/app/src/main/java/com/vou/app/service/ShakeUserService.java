package com.vou.app.service;

import com.vou.app.entity.EventGames;
import com.vou.app.entity.ShakeUser;
import com.vou.app.entity.ShakeUserRequest;
import com.vou.app.entity.User;
import com.vou.app.repository.EventGamesRepository;
import com.vou.app.repository.ShakeUserRepository;
import com.vou.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShakeUserService {
    @Autowired
    private ShakeUserRepository shakeUserRepository;
    @Autowired
    private EventGamesRepository eventGamesRepository;
    @Autowired
    private UserRepository userRepository;

    public ShakeUser createShakeUser(final ShakeUserRequest shakeUserRequest) {
        Optional<EventGames> eventGames = eventGamesRepository.findById(shakeUserRequest.getEventgameid());
        Optional<User> user = userRepository.findById(shakeUserRequest.getPlayerid());

        if (eventGames.isPresent() && user.isPresent()) {
            ShakeUser shakeUser = ShakeUser
                                    .builder()
                                    .eventGames(eventGames.get())
                                    .player(user.get())
                                    .quantity(shakeUserRequest.getQuantity())
                                    .build();

            return shakeUserRepository.save(shakeUser);
        }

        return null;
    }

    // increase quantity of shake user find by user id and event game id
    public ShakeUser adjustQuantity(final Long userId, final Long eventGameId, final int quantity) {
        Optional<ShakeUser> shakeUser = shakeUserRepository.findByPlayerIdAndEventGamesId(userId, eventGameId);

        if (shakeUser.isPresent()) {
            shakeUser.get().setQuantity(shakeUser.get().getQuantity() + quantity);
            return shakeUserRepository.save(shakeUser.get());
        }
        else{
            // create new shake user
            Optional<EventGames> eventGames = eventGamesRepository.findById(eventGameId);
            Optional<User> user = userRepository.findById(userId);

            if (eventGames.isPresent() && user.isPresent()) {
                ShakeUser newShakeUser = ShakeUser
                                        .builder()
                                        .eventGames(eventGames.get())
                                        .player(user.get())
                                        .quantity(9)
                                        .build();

                return shakeUserRepository.save(newShakeUser);
            }
        }

        return null;
    }

    public ShakeUser getShakeUserByUserIdAndEventGameId(final Long userId, final Long eventGameId) {
        return shakeUserRepository.findByPlayerIdAndEventGamesId(userId, eventGameId).orElse(null);
    }

}
