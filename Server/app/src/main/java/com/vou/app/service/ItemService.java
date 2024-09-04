package com.vou.app.service;

import com.vou.app.entity.Items;
import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import com.vou.app.repository.ItemsRepository;
import com.vou.app.repository.UserItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private final ItemsRepository itemsRepository;

    public ItemService(ItemsRepository ItemRepository) {
        this.itemsRepository = ItemRepository;
    }

    // Get item from user id and event id
    public Items getItem(Long id) {
        return itemsRepository.findById(id).orElse(null);
    }

    public List<Items> getItemByEventId(Long eventId) {
        return itemsRepository.findByEventId(eventId);
    }
}
