package com.vou.app.entity;

public class GamesResponse {
    private Long id;
    private String name;
    private String description;
    private String instructions;

    // Constructor
    public GamesResponse(Long id, String name, String description, String instructions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.instructions = instructions;
    }

    // Getters and setters (optional)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}

