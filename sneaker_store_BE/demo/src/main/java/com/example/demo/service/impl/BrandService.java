package com.example.demo.service.impl;

import com.example.demo.model.Brand;
import com.example.demo.repository.IBrandRepository;
import com.example.demo.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BrandService implements IBrandService {
    @Autowired
    private IBrandRepository iBrandRepository;
    @Override
    public List<Brand> findAll() {
        return iBrandRepository.findAll();
    }
}
