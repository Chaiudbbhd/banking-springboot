                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.service;

import com.example.banking.entity.Account;
import com.example.banking.entity.Transaction;
import com.example.banking.repository.AccountRepository;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionService transactionService;  // Inject this service

    public AccountService(AccountRepository accountRepository,
                          TransactionService transactionService) {
        this.accountRepository = accountRepository;
        this.transactionService = transactionService;
    }

    public double getBalance(Long accountId) {
        return accountRepository.findById(accountId)
                .map(Account::getBalance)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    @Transactional
    public void deposit(Long accountId, double amount) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);
        transactionService.recordTransaction(accountId, "DEPOSIT", amount);
    }

    @Transactional
    public void withdraw(Long accountId, double amount) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }
        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);
        transactionService.recordTransaction(accountId, "WITHDRAW", amount);
    }

    @Transactional
    public void transfer(Long fromAccountId, Long toAccountId, double amount) {
        withdraw(fromAccountId, amount);
        deposit(toAccountId, amount);
        transactionService.recordTransaction(fromAccountId, "TRANSFER_OUT", amount);
        transactionService.recordTransaction(toAccountId, "TRANSFER_IN", amount);
    }

    public List<Transaction> getTransactions(Long accountId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTransactions'");
    }
}
