package com.vou.app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "UserItems")
public class UserItem {
    @EmbeddedId
    private UserItemsId id;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @MapsId("itemsID") // Ensures that the embedded ID maps correctly
    @JoinColumn(name = "itemsID") // Removed insertable and updatable constraints
    private Items items;

    // Default Constructor
    public UserItem() {}

    // Constructor for creating UserItem with UserItemsId and quantity
    public UserItem(UserItemsId id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public UserItem(Long userID, Long itemId, int quantity) {
        this.id = new UserItemsId(itemId, userID);
        this.quantity = quantity;
    }

    // Constructor for creating UserItem with userID, itemId, and quantity
    public UserItem(Long userID, Long itemId, int quantity, Items items) {
        this.id = new UserItemsId(itemId, userID);
        this.items = items;
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

    public Items getItems() {
        return items;
    }

    public void setItems(Items items) {
        this.items = items;
    }
}
