package com.vou.app.repository;

import com.vou.app.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    List<QuizResult> findByEventGameId(Long eventGameId);

    List<QuizResult> findByUserId(String userId);

    List<QuizResult> findByEventGameIdAndUserId(Long eventGameId, String userId);
}
