package com.example.demo.repository;

import com.example.demo.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductTypeRepository extends JpaRepository<ProductType,Integer> {
    @Override
    List<ProductType> findAll();
}
