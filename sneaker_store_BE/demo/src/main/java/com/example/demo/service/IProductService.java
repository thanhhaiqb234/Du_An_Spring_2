package com.example.demo.service;

import com.example.demo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<Product> findProductSale(Integer page);

    List<Product> findProductHome();

    Page<Product> findAllByNameProductContaining(String name, Pageable pageable);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findProductByProductTypeId(Pageable pageable, Integer id);

    Product findProductById(Integer id);


    List<Product> findByBrand_Id(Integer id);

    List<Product> findProductByIdBrand(Integer id, Integer page);

    void updateQuantityProductById(int quantity, int idProduct);

    Page<Product> findProductByAllField(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd);

    Page<Product> findProductByField(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize);

    Page<Product> sortProductByPrice(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize);

    Page<Product> sortProductByPriceDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize);

    Page<Product> sortProductByNameDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize);

    Page<Product> sortProductByName(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize);

    Page<Product> sortProductByPrice(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd);

    Page<Product> sortProductByPriceDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd);

    Page<Product> sortProductByNameDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd);

    Page<Product> sortProductByName(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd);


}
