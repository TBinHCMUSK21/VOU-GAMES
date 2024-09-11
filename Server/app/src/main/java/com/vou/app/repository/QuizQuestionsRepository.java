package com.vou.app.repository;

import com.vou.app.entity.QuizQuestions;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizQuestionsRepository extends JpaRepository<QuizQuestions, Long> {
    List<QuizQuestions> findByEventGameId(Long eventGameId);
}
