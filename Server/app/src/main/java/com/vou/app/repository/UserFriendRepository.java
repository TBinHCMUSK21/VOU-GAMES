package com.vou.app.repository;

import com.vou.app.entity.User;
import com.vou.app.entity.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFriendRepository extends JpaRepository<UserFriend, Long> {

    UserFriend findByUserAndFriend(User user, User friend);

    void deleteByUserAndFriend(User user, User friend);

    List<User> findFriendsByUser(User user);
}
