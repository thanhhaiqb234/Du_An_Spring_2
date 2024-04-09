package com.example.demo.service.impl;

import com.example.demo.model.Size;
import com.example.demo.repository.ISizeRepository;
import com.example.demo.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService implements ISizeService {
    @Autowired
    private ISizeRepository iSizeRepository;

    @Override
    public List<Size> findAll() {
        return iSizeRepository.findAll();
    }
}
