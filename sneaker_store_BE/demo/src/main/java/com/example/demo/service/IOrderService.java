package com.example.demo.service;

import com.example.demo.model.Order;

import java.util.List;

public interface IOrderService {
    Order addOder (Order orderProduct);
    List<Order> findOrdersByAccountEmail(String email,int number);
    List <Order> getOrderByAccount(String email);
}
