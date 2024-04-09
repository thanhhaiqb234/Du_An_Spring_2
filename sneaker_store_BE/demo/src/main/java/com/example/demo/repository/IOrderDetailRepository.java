package com.example.demo.repository;

import com.example.demo.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    List<OrderDetail> findByOrders_Id(Integer idOder);
}
