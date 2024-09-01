package com.vou.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class GoogleCloudConfig {

    @Value("${google.cloud.credentials.path}")
    private String googleCredentialsPath;

    @PostConstruct
    public void init() {
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", googleCredentialsPath);
    }
}
