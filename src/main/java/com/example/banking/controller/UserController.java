                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.dto.TransactionRequest;
import com.example.banking.dto.TransferRequest;
import com.example.banking.entity.Transaction;
import com.example.banking.service.AccountService;
import com.example.banking.service.TransactionService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AccountService accountService;
    private final TransactionService transactionService;

    public UserController(AccountService accountService, TransactionService transactionService) {
        this.accountService = accountService;
        this.transactionService = transactionService;
    }

    @GetMapping("/balance/{accountId}")
public ResponseEntity<Double> getBalance(@PathVariable Long accountId) {
    double balance = accountService.getBalance(accountId);
    return ResponseEntity.ok(balance);
}


    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestBody TransactionRequest request) {
        accountService.deposit(request.getAccountId(), request.getAmount());
        transactionService.recordTransaction(request.getAccountId(), "DEPOSIT", request.getAmount());
        return ResponseEntity.ok("Deposit successful");
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody TransactionRequest request) {
        accountService.withdraw(request.getAccountId(), request.getAmount());
        transactionService.recordTransaction(request.getAccountId(), "WITHDRAW", request.getAmount());
        return ResponseEntity.ok("Withdraw successful");
    }

  @PostMapping("/transfer")
public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
    accountService.transfer(request.getFromAccountId(), request.getToAccountId(), request.getAmount());

    transactionService.recordTransaction(request.getFromAccountId(), "TRANSFER_OUT", request.getAmount());
    transactionService.recordTransaction(request.getToAccountId(), "TRANSFER_IN", request.getAmount());

    return ResponseEntity.ok("Transfer successful");
}



    @GetMapping("/transactions/{accountId}")
    public List<Transaction> getTransactions(@PathVariable Long accountId) {
        return transactionService.getTransactions(accountId);
    }
}
