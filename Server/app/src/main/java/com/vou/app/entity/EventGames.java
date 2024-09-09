package com.vou.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "eventgames")
public class EventGames {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "eventid", nullable = false)
    private Events event;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gameid", nullable = false)
    private Games game;
}


