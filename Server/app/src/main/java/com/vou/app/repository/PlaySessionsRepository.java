package com.vou.app.repository;

import com.vou.app.entity.PlaySessions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaySessionsRepository extends JpaRepository<PlaySessions, Long> {

}
