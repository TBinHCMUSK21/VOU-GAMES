package com.vou.app.service;

import com.vou.app.entity.QuizResult;
import com.vou.app.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    public QuizResult saveQuizResult(QuizResult quizResult) {
        return quizResultRepository.save(quizResult);
    }

    public List<QuizResult> getResultsByEventGameId(Long eventGameId) {
        return quizResultRepository.findByEventGameId(eventGameId);
    }

    public List<QuizResult> getResultsByUserId(String userId) {
        return quizResultRepository.findByUserId(userId);
    }

    public List<QuizResult> getResultsByEventGameIdAndUserId(Long eventGameId, String userId) {
        return quizResultRepository.findByEventGameIdAndUserId(eventGameId, userId);
    }
}
