package com.vou.app.controller;

import com.vou.app.service.TextToSpeechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TextToSpeechController {

    @Autowired
    private TextToSpeechService textToSpeechService;

    @GetMapping("/api/text-to-speech")
    public String convertTextToSpeech() {
        try {
            String outputPath = "output.mp3";
            textToSpeechService.textToSpeech("This is a demo for the text to speech", outputPath);
            return "Audio content written to file: " + outputPath;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error converting text to speech: " + e.getMessage();
        }
    }

    @GetMapping("/")
    public String main(){
        return "This is a main program!!!";
    }
}
