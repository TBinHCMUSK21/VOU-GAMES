package com.vou.app.service;

import com.vou.app.dto.OptionResponse;
import com.vou.app.dto.QuestionResponse;
import com.vou.app.entity.QuizAnswer;
import com.vou.app.entity.QuizQuestions;
import com.vou.app.repository.QuizAnswerRepository;
import com.vou.app.repository.QuizQuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizQuestionsRepository quizQuestionRepository;

    @Autowired
    private QuizAnswerRepository quizAnswerRepository;

    private static final String[] OPTION_COLORS = {
            "bg-red-500",
            "bg-blue-500",
            "bg-yellow-500",
            "bg-green-500"
    };

    public List<QuestionResponse> getQuizQuestions(Long gameId) {
        List<QuestionResponse> questionDTOs = new ArrayList<>();
        List<QuizQuestions> quizQuestions = quizQuestionRepository.findByGameId(gameId);

        for (QuizQuestions quizQuestion : quizQuestions) {
            QuestionResponse questionDTO = new QuestionResponse();
            questionDTO.setId(Math.toIntExact(quizQuestion.getId()));
            questionDTO.setQuestionText(quizQuestion.getTitle());
            questionDTO.setTimeRemaining(10);

            List<OptionResponse> options = new ArrayList<>();
            List<QuizAnswer> quizAnswers = quizAnswerRepository.findByQuestionId(quizQuestion.getId());

            for (int i = 0; i < quizAnswers.size(); i++) {
                QuizAnswer quizAnswer = quizAnswers.get(i);
                OptionResponse optionDTO = new OptionResponse();
                optionDTO.setId(Math.toIntExact(quizAnswer.getId()));
                optionDTO.setText(quizAnswer.getAnswerText());
                optionDTO.setCorrect(quizAnswer.getIsCorrect());

                String color = OPTION_COLORS[i % OPTION_COLORS.length];
                optionDTO.setColor(color);

                options.add(optionDTO);
            }

            questionDTO.setOptions(options);
            questionDTOs.add(questionDTO);
        }

        return questionDTOs;
    }
}
