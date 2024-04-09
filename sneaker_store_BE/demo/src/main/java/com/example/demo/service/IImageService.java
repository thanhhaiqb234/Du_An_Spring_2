package com.example.demo.service;

import com.example.demo.model.Image;

import java.util.List;

public interface IImageService {
    List<Image> findImageByIdProduct(Integer id);
}
