package com.vou.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "brands")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gps_lat")
    private Float gpsLat;

    @Column(name = "gps_long")
    private Float gpsLong;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "field", length = 255)
    private String field;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "status", length = 255)
    private String status;

    @Column(name = "accountid")
    private Long accountId;

    @Column(name = "account_id")
    private Integer accountIdInt;

    @Column(name = "brand_entity")
    private String brandEntity;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getGpsLat() {
        return gpsLat;
    }

    public void setGpsLat(Float gpsLat) {
        this.gpsLat = gpsLat;
    }

    public Float getGpsLong() {
        return gpsLong;
    }

    public void setGpsLong(Float gpsLong) {
        this.gpsLong = gpsLong;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Integer getAccountIdInt() {
        return accountIdInt;
    }

    public void setAccountIdInt(Integer accountIdInt) {
        this.accountIdInt = accountIdInt;
    }

    public String getBrandEntity() {
        return brandEntity;
    }

    public void setBrandEntity(String brandEntity) {
        this.brandEntity = brandEntity;
    }
}
