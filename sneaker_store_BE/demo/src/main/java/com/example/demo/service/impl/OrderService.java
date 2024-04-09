package com.example.demo.service.impl;

import com.example.demo.model.Order;
import com.example.demo.repository.IOrdersRepository;
import com.example.demo.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IOrdersRepository orderRepository;
    public Order addOder(Order order) {
        order.setStatusOrder(false);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findOrdersByAccountEmail(String email,int number) {
        return orderRepository.findOrderByAccount(email,number);
    }

    @Override
    public List<Order> getOrderByAccount(String email) {
        return orderRepository.findByAccount_Email(email);
    }
}
