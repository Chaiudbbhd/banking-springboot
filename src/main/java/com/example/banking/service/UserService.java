                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.service;

import com.example.banking.entity.User;
import com.example.banking.entity.Account;           
import com.example.banking.repository.UserRepository;
import com.example.banking.repository.AccountRepository;  
import org.apache.ibatis.jdbc.ScriptRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Connection;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;  
    private final PasswordEncoder passwordEncoder;
    private final DataSource dataSource;

    public UserService(UserRepository userRepository,
                       AccountRepository accountRepository,    
                       PasswordEncoder passwordEncoder,
                       DataSource dataSource) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.dataSource = dataSource;
    }

    public User registerUser(String username, String email, String password, String role) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .username(username)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .tenantId(UUID.randomUUID().toString()) 
                .build(); 
        User savedUser = userRepository.save(user);

        Account account = new Account();
        account.setBalance(0.0);
        account.setUser(savedUser);
        accountRepository.save(account);
        runSqlScript("src/main/resources/schema/init_tenant.sql");
        return savedUser;
    }
    private void runSqlScript(String scriptPath) {
        try (Connection conn = dataSource.getConnection()) {
            ScriptRunner runner = new ScriptRunner(conn);
            runner.setLogWriter(null);
            runner.setErrorLogWriter(null);

            try (BufferedReader reader = new BufferedReader(new FileReader(scriptPath))) {
                runner.runScript(reader);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute SQL script: " + e.getMessage(), e);
        }
    }
}
