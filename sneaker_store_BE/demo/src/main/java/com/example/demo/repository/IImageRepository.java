package com.example.demo.repository;

import com.example.demo.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IImageRepository extends JpaRepository<Image,Integer> {

    List<Image> findByProduct_Id(Integer product_id);
}
