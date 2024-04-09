package com.example.demo.repository;

import com.example.demo.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IColorRepository extends JpaRepository<Color,Integer> {

    List<Color> findAll();
}
