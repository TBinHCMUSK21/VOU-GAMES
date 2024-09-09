package com.vou.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserItemsId implements Serializable {
    @Column(name = "itemsID") // Ensure this matches the column name in the database
    private Long itemsID; // Use Long for consistency with IDs

    @Column(name = "userID") // Ensure this matches the column name in the database
    private Long userID; // Use Long for consistency with IDs

    // Constructors
    public UserItemsId() {
    }

    public UserItemsId(Long itemsID, Long userID) {
        this.itemsID = itemsID;
        this.userID = userID;
    }

    // Getters and Setters
    public Long getItemsID() {
        return itemsID;
    }

    public void setItemsID(Long itemsID) {
        this.itemsID = itemsID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserItemsId that = (UserItemsId) o;
        return itemsID.equals(that.itemsID) && userID.equals(that.userID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemsID, userID);
    }
}

