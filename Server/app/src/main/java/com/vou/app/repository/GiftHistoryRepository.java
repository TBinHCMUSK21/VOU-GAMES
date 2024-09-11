package com.vou.app.repository;

import com.vou.app.entity.GiftHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftHistoryRepository extends JpaRepository<GiftHistory, Long> {
    // You can define custom queries here if needed
}
