package com.vou.app.repository;

import com.vou.app.entity.User;
import com.vou.app.entity.UserItem;
import com.vou.app.entity.UserItemsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserItemRepository extends JpaRepository<UserItem, UserItemsId> {

    @Query("SELECT ui FROM UserItem ui " +
            "JOIN ui.items i " +
            "WHERE ui.id.userID = :userId AND i.event.id = :eventId")
    List<UserItem> findUserItemsByUserAndEvent(@Param("userId") Long userId, @Param("eventId") Long eventId);

    // find user item by user id and item id
    @Query("SELECT ui FROM UserItem ui WHERE ui.id.userID = :userId AND ui.id.itemsID = :itemId")
    UserItem findUserItem(@Param("userId") Long userId, @Param("itemId") Long itemId);
}