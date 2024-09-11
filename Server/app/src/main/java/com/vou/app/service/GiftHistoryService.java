package com.vou.app.service;

import com.vou.app.entity.GiftHistory;
import com.vou.app.repository.GiftHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class GiftHistoryService {

    @Autowired
    private GiftHistoryRepository giftHistoryRepository;

    public GiftHistory saveGiftHistory(Long giverId, Long receiverId, Long itemId, Long eventGameId) {
        GiftHistory giftHistory = GiftHistory.builder()
                .giverId(giverId)
                .receiverId(receiverId)
                .itemId(itemId)
                .eventGameId(eventGameId)
                .giftTime(LocalDateTime.now())
                .build();
        return giftHistoryRepository.save(giftHistory);
    }

    public Optional<GiftHistory> findById(Long id) {
        return giftHistoryRepository.findById(id);
    }

    // Add other methods as necessary
}
