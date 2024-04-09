package com.example.demo.service;

import com.example.demo.model.Account;
import com.example.demo.model.Cart;
import com.example.demo.model.Product;

import java.util.List;

public interface ICartService {
    List<Cart> getAllByIdAccount(Integer id);

    void setCart(Cart cart);
    void createCart(Account account, Product product, Integer quantity);

    void deleteCartByIdProductAndAccount(Integer idAccount,Integer idProduct);

    void deleteByIdAccount(Account account);

    Cart getCartByProductAndByAccount(Integer idAccount, Integer idProduct);
    Integer countTotalProductByAccount(int idAccount);

}
