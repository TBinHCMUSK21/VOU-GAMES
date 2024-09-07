package com.vou.app.repository;

import com.vou.app.entity.Items;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemsRepository extends JpaRepository<Items, Long> {
    List<Items> findByEventId(Long eventId);
    // You can add custom query methods here if needed
}

