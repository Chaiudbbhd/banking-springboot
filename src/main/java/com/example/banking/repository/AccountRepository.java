                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.banking.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    // Add this method signature to find account by the associated user ID
    Account findByUserId(Long userId);

}
