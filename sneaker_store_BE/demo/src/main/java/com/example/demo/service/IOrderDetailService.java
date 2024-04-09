package com.example.demo.service;

import com.example.demo.model.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    void addOrderDetail(OrderDetail orderDetail);
    List<OrderDetail> findByOrder_Id(Integer idOder);
}
