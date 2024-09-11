package com.vou.app.controller;

import com.vou.app.dto.QuestionResponse;
import com.vou.app.entity.QuizResult;
import com.vou.app.service.QuizResultService;
import com.vou.app.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games/quiz")
public class QuizController {

    @Autowired
    private QuizResultService quizResultService;

    @PostMapping("/result")
    public ResponseEntity<String> saveQuizResult(@RequestBody QuizResult quizResult) {
        quizResultService.saveQuizResult(quizResult);
        return ResponseEntity.ok("Kết quả đã được lưu thành công");
    }

    @Autowired
    private QuizService quizService;

    @GetMapping("/{eventGameID}")
    public ResponseEntity<List<QuestionResponse>> getQuiz(@PathVariable Long eventGameID) {
        List<QuestionResponse> questions = quizService.getQuizQuestions(eventGameID);
        if (questions == null || questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(questions);
    }
}
