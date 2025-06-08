                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©s
package com.example.banking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String role;  // e.g., ROLE_USER or ROLE_STAFF

    @Column(nullable = false, unique = true)
    private String tenantId; // unique identifier for this user’s tenant DB/schema
}
