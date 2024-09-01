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

@Embeddable
class UserItemsId implements Serializable {
    @Column(name = "itemsID")
    private int itemsID;

    @Column(name = "userID")
    private int userID;

    // Constructors
    public UserItemsId() {}

    public UserItemsId(int itemsID, int userID) {
        this.itemsID = itemsID;
        this.userID = userID;
    }

    // Getters and Setters
    public int getItemsID() {
        return itemsID;
    }

    public void setItemsID(int itemsID) {
        this.itemsID = itemsID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    // hashCode and equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserItemsId that = (UserItemsId) o;
        return itemsID == that.itemsID && userID == that.userID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemsID, userID);
    }
}

