package com.vou.app.repository;

import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserItemRepository extends JpaRepository<UserItem, UserItemsId> {
}