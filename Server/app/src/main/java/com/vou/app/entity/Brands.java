package com.vou.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "brands")
public class Brands {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "accountid", nullable = false)
    private Accounts account;
    @Column(name = "name")
    private String name;
    @Column(name = "field")
    private String field;
    @Column(name = "address")
    private String address;
    @Column(name = "GPS_lat")
    private Float GPS_lat;
    @Column(name = "GPS_long")
    private Float GPS_long;
    @Column(name = "status")
    private String status;
}
