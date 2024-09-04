package com.vou.app.repository;

import com.vou.app.entity.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Long> {
    List<QuizAnswer> findByQuestionId(Long questionId);
}
