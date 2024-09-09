package com.vou.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ShakeUser")
public class ShakeUser {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "eventgameid", nullable = false)
    private EventGames eventGames;

    @ManyToOne
    @JoinColumn(name = "playerid", nullable = false)
    private User player;

    private Integer quantity;
}
