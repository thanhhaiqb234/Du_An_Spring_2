package com.example.demo.controller;

import com.example.demo.model.Order;
import com.example.demo.model.OrderDetail;
import com.example.demo.service.IOrderDetailService;
import com.example.demo.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private IOrderDetailService orderDetailService;
    @Autowired
    IOrderService orderService;

    @GetMapping()
    public ResponseEntity<List<OrderDetail>> getOrderDetailByIdOder(@RequestParam("id") Integer idOrder) {

        List<OrderDetail> detailList = orderDetailService.findByOrder_Id(idOrder);
        if (detailList == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(detailList, HttpStatus.OK);
        }
    }

    @GetMapping("/list-order")
    public ResponseEntity<List<Order>> getListOrderByEmail(@RequestParam("email") String email,@RequestParam("page") String page) {
        List<Order> orderList = orderService.findOrdersByAccountEmail(email,Integer.parseInt(page));
        if (orderList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }
    @GetMapping ("list")
    public ResponseEntity<List<Order>> getListOrder(@RequestParam("email") String email) {
        List<Order> orderList = orderService.getOrderByAccount(email);
        if (orderList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }
}
