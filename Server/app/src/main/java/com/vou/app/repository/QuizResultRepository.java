package com.vou.app.repository;


import com.vou.app.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findByGameId(Long gameId);


    List<QuizResult> findByUserId(String userId);

    List<QuizResult> findByGameIdAndUserId(Long gameId, String userId);
}
