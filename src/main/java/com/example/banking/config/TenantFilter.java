                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.config;

import com.example.banking.entity.User;
import com.example.banking.repository.UserRepository;
import com.example.banking.util.TenantContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class TenantFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    public TenantFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            String username = auth.getName();
            User user = userRepository.findByUsername(username).orElse(null);
            if (user != null) {
                TenantContext.setCurrentTenant(user.getTenantId());
            }
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();  // Always clear after request is done
        }
    }
}
