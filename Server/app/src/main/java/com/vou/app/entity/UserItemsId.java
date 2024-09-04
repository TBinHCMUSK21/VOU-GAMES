package com.vou.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserItemsId implements Serializable {
    @Column(name = "itemsID")
    private int itemsID;

    @Column(name = "userID")
    private int userID;

    // Constructors
    public UserItemsId() {
    }

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
