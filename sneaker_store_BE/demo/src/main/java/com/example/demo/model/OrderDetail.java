package com.example.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order_detail",nullable = false)
    private Integer id;
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "id_product",nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id_orders",nullable = false)
    private Order orders;


    public OrderDetail(Integer id, Integer quantity, Product product, Order orders) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
        this.orders = orders;
    }

    public OrderDetail(Integer quantity, Product product) {
        this.quantity = quantity;
        this.product = product;
    }

    public OrderDetail(Integer quantity,  Order orders,Product product) {
        this.quantity = quantity;
        this.product = product;
        this.orders = orders;
    }

    public OrderDetail() {
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrders() {
        return orders;
    }

    public void setOrders(Order orders) {
        this.orders = orders;
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



    public Order getOrder() {
        return orders;
    }

    public void setOrder(Order order) {
        this.orders = order;
    }
}
