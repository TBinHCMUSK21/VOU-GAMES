package com.vou.app.controller;

import com.vou.app.dto.QuestionResponse;
import com.vou.app.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/{gameId}")
    public ResponseEntity<List<QuestionResponse>> getQuiz(@PathVariable Long gameId) {
        List<QuestionResponse> questions = quizService.getQuizQuestions(gameId);
        if (questions == null || questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(questions);
    }
}
