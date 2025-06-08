                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.service;

import com.example.banking.entity.Transaction;
import com.example.banking.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    // Constructor Injection
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // Method to record a new transaction
    public void recordTransaction(Long accountId, String type, double amount) {
        Transaction txn = new Transaction();
        txn.setAccountId(accountId);
        txn.setType(type);
        txn.setAmount(amount);
        txn.setTimestamp(LocalDateTime.now());
        transactionRepository.save(txn);
    }

    // Method to fetch transactions by account ID
    public List<Transaction> getTransactions(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }
}
