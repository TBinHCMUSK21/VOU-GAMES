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

    public List<QuestionResponse> getQuizQuestions(Long eventGameID) {
        List<QuestionResponse> questionResponses = new ArrayList<>();
        List<QuizQuestions> quizQuestions = quizQuestionRepository.findByEventGameId(eventGameID);

        if (quizQuestions.isEmpty()) {
            return questionResponses;
        }

        for (QuizQuestions quizQuestion : quizQuestions) {
            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setId(Math.toIntExact(quizQuestion.getId()));
            questionResponse.setQuestionText(quizQuestion.getTitle());
            questionResponse.setFile(quizQuestion.getFile());
            questionResponse.setTimeRemaining(10);

            List<OptionResponse> options = new ArrayList<>();
            List<QuizAnswer> quizAnswers = quizAnswerRepository.findByQuestionId(quizQuestion.getId());

            if (!quizAnswers.isEmpty()) {
                for (int i = 0; i < quizAnswers.size(); i++) {
                    QuizAnswer quizAnswer = quizAnswers.get(i);
                    OptionResponse optionResponse = new OptionResponse();
                    optionResponse.setId(Math.toIntExact(quizAnswer.getId()));
                    optionResponse.setText(quizAnswer.getAnswerText());
                    optionResponse.setCorrect(quizAnswer.getIsCorrect());

                    String color = OPTION_COLORS[i % OPTION_COLORS.length];
                    optionResponse.setColor(color);

                    options.add(optionResponse);
                }
            }

            questionResponse.setOptions(options);
            questionResponses.add(questionResponse);
        }

        return questionResponses;
    }
}
