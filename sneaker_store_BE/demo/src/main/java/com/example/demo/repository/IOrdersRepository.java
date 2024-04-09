package com.example.demo.repository;

import com.example.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IOrdersRepository extends JpaRepository<Order, Integer> {
    @Query(value = "select  * from orders join account a on a.id_account = orders.id_account where a.email= :emailAccount\n" +
            "order by date_order desc limit :number",
            nativeQuery = true)
    List<Order> findOrderByAccount(@Param("emailAccount") String email, @Param("number") int number);
    List<Order> findByAccount_Email(String email);
}
