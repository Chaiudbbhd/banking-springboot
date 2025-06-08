                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.controller;

import com.example.banking.dto.*;
import com.example.banking.entity.Account;
import com.example.banking.entity.User;
import com.example.banking.repository.AccountRepository;
import com.example.banking.repository.UserRepository;
import com.example.banking.service.UserService;
import com.example.banking.util.JwtUtil;

import org.springframework.security.core.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;      // <-- Injected
    private final AccountRepository accountRepository; // <-- Injected

    // Constructor injection
    public AuthController(UserService userService,
                          AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          AccountRepository accountRepository) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserSignupRequest signupRequest) {
        try {
            String username = signupRequest.getUsername();
            String email = signupRequest.getEmail();
            String password = signupRequest.getPassword();

            String role = signupRequest.getRoles().get(0);

            User savedUser = userService.registerUser(username, email, password, role);

            String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole());

            return ResponseEntity.ok(new AuthResponse(token, savedUser.getUsername(), savedUser.getRole()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestParam Long userId) {
        // Check user existence
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Check if user already has account (optional)
        Account existingAccount = accountRepository.findByUserId(userId);
        if (existingAccount != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Account already exists for this user");
        }

        Account account = new Account();
        account.setUser(user);
        account.setBalance(1000.0); // default balance

        Account savedAccount = accountRepository.save(account);
        return ResponseEntity.ok(savedAccount);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        try {
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            String token = jwtUtil.generateToken(userDetails.getUsername(), userDetails.getAuthorities().toString());
            return ResponseEntity.ok(new AuthResponse(token, userDetails.getUsername(), userDetails.getAuthorities().toString()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
