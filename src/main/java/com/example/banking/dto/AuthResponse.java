                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©s
package com.example.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private  String role;
}
