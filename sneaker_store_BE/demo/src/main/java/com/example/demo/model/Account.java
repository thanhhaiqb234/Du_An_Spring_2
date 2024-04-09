package com.example.demo.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_account", nullable = false)
    private  Integer id;
    private String email;
    private String password;
    private String verificationCode;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "account_role",
            joinColumns = @JoinColumn(name = "id_account"),
            inverseJoinColumns = @JoinColumn(name = "id_role"))
    Set<Role> roleAccount=new HashSet<>();

    public Account(Integer id, String email, String password, Set<Role> roleAccount) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.roleAccount = roleAccount;
    }

    public Account(Integer id, String email, String password, String verificationCode, Set<Role> roleAccount) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.verificationCode = verificationCode;
        this.roleAccount = roleAccount;
    }

    public Account(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Set<Role> getRoleAccount() {
        return roleAccount;
    }

    public void setRoleAccount(Set<Role> roleAccount) {
        this.roleAccount = roleAccount;
    }

    public Account() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
