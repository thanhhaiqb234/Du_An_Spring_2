package com.example.demo.service.impl;

import com.example.demo.model.ProductType;
import com.example.demo.repository.IProductTypeRepository;
import com.example.demo.service.IProductTypService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService implements IProductTypService {
    @Autowired
    private IProductTypeRepository productTypeRepository;
    @Override
    public List<ProductType> findAll() {
        return productTypeRepository.findAll();
    }
}
