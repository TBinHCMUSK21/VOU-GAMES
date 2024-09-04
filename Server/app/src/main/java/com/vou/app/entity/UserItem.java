package com.vou.app.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "UserItem")
public class UserItem {
    @EmbeddedId
    private UserItemsId id;

    @Column(nullable = false)
    private int quantity;

    // Constructors
    public UserItem() {}

    public UserItem(UserItemsId id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    // Getters and Setters
    public UserItemsId getId() {
        return id;
    }

    public void setId(UserItemsId id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

