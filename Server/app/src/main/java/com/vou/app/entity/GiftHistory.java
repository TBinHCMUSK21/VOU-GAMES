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
@Table(name = "gift_history")
public class GiftHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "giver_id")
    private Long giverId;

    @Column(name = "receiver_id")
    private Long receiverId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "eventgame_id")
    private Long eventGameId;

    @Column(name = "gift_time")
    private LocalDateTime giftTime;
}
