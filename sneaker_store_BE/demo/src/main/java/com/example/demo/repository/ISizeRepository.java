package com.example.demo.repository;

import com.example.demo.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ISizeRepository extends JpaRepository<Size,Integer> {
    List<Size> findAll();
}
