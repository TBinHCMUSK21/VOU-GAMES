package com.vou.app.repository;

import com.vou.app.entity.ShakeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShakeUserRepository extends JpaRepository<ShakeUser, Long> {

}
