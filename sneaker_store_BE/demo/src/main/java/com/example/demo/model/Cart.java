package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Cart {
    @Id
    @Column(name = "id_cart",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    private  Integer quantity;
    @ManyToOne
    @JoinColumn(name = "id_product",nullable = false)
    private Product product;
    @OneToOne
    @JoinColumn(name = "id_account",nullable = false)
    private Account account;

    public Cart(Integer id, Integer quantity, Product product, Account account) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
        this.account = account;
    }

    public Cart() {
    }

    public Cart(Integer quantity, Product product, Account account) {
        this.quantity = quantity;
        this.product = product;
        this.account = account;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

}
