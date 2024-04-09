package com.example.demo.service.impl;

import com.example.demo.model.Image;
import com.example.demo.repository.IImageRepository;
import com.example.demo.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImageService implements IImageService {
    @Autowired
    private IImageRepository iImageRepository;

    @Override
    public List<Image> findImageByIdProduct(Integer id) {
        return iImageRepository.findByProduct_Id(id);
    }
}
