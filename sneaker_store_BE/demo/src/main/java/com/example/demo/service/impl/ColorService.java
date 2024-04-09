package com.example.demo.service.impl;

import com.example.demo.model.Color;
import com.example.demo.repository.IColorRepository;
import com.example.demo.service.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ColorService implements IColorService {
    @Autowired
    private IColorRepository iColorRepository;

    @Override
    public List<Color> finAll() {
        return iColorRepository.findAll();
    }
}
