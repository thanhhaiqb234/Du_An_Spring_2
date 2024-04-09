package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orders",nullable = false)
    private Integer id;
    private String name;
    private String totalMoney;
    @Column(columnDefinition = "LONGTEXT")
    private String address;
    @Column(columnDefinition = "DATETIME")
    private String dateOrder;
   private String numberPhone;
    @Column(columnDefinition = "DATE")
    private String deliveryDate;
    @Column(columnDefinition = "LONGTEXT")
    private String note;
    private Boolean  statusOrder;
    @ManyToOne
    @JoinColumn(name = "id_account",nullable = false)
    private Account account;

    public Order(Integer id, String name, String totalMoney, String address, String dateOrder, String numberPhone, String deliveryDate, String note, Boolean statusOrder, Account account) {
        this.id = id;
        this.name = name;
        this.totalMoney = totalMoney;
        this.address = address;
        this.dateOrder = dateOrder;
        this.numberPhone = numberPhone;
        this.deliveryDate = deliveryDate;
        this.note = note;
        this.statusOrder = statusOrder;
        this.account = account;
    }

    public Order(Integer id, String address, String dateOrder, String deliveryDate, String note, Boolean statusOrder, Account account) {
        this.id = id;
        this.address = address;
        this.dateOrder = dateOrder;
        this.deliveryDate = deliveryDate;
        this.note = note;
        this.statusOrder = statusOrder;
        this.account = account;
    }

    public Order() {
    }

    public Order(String name, String totalMoney, String address, String dateOrder, String numberPhone, String note, Account account) {
        this.name = name;
        this.totalMoney = totalMoney;
        this.address = address;
        this.dateOrder = dateOrder;
        this.numberPhone = numberPhone;
        this.note = note;
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(String dateOrder) {
        this.dateOrder = dateOrder;
    }

    public Boolean getStatusOrder() {
        return statusOrder;
    }

    public void setStatusOrder(Boolean statusOrder) {
        this.statusOrder = statusOrder;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(String deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getNumberPhone() {
        return numberPhone;
    }

    public void setNumberPhone(String numberPhone) {
        this.numberPhone = numberPhone;
    }

    public String getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(String totalMoney) {
        this.totalMoney = totalMoney;
    }
}
