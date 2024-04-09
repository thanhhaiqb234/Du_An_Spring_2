package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user",nullable = false)
    private Integer id;
    private String username;
    private String dateOfBirth;
    private Boolean gender;
    private String numberPhone;
    private String address;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_account",nullable = false)
    private Account account;

    public User(Integer id, String username, String dateOfBirth, Boolean gender, String numberPhone, String address, Account account) {
        this.id = id;
        this.username = username;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.numberPhone = numberPhone;
        this.address = address;
        this.account = account;
    }

    public User(Account account) {
        this.account = account;
    }

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
