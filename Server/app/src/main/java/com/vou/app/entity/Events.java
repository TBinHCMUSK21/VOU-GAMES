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
@Table(name = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "brandid", nullable = false)
    private Brands brand;
    @Column(name = "name")
    private String name;
    @Column(name = "image")
    private String image;
    @Column(name = "voucherCount")
    private Integer voucherCount;
    @Column(name = "startTime")
    private LocalDateTime startTime;
    @Column(name = "endTime")
    private LocalDateTime endTime;
    @Column(name = "gameType")
    private String gameType;
    @Column(name = "targetWord")
    private String targetWord;
}
