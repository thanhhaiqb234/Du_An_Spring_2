package com.example.demo.repository;

import com.example.demo.model.Account;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account,Integer> {
    Optional<Account> findByEmail(String email);

    Boolean existsAccountByEmail(String email);

    @Modifying
    @Query(value = "UPDATE account SET password = :password WHERE id = :id", nativeQuery = true)
    void saveNewPassword(@Param("id") Integer id, @Param("password") String password);
}
