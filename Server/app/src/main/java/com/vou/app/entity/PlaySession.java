package com.vou.app.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "playsessions")
public class PlaySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "playerid", nullable = false)
    private User player;

    @ManyToOne
    @JoinColumn(name = "eventgameid", nullable = false)
    private EventGames eventGames;

    @Column(name = "startTime", nullable = false)
    private LocalDateTime startTime = LocalDateTime.now();

    @Column(name = "endTime")
    private LocalDateTime endTime;
}
