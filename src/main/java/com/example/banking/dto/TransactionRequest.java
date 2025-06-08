                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©s
package com.example.banking.dto;

public class TransactionRequest {

    private Long accountId;
    private double amount;
    private String description;

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
