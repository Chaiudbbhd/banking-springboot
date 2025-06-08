                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double balance;

    // Add user field and mapping
    @ManyToOne
    @JoinColumn(name = "user_id")  // Foreign key column in account table
    private User user;

    // Constructors
    public Account() {
    }

    public Account(double balance) {
        this.balance = balance;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
