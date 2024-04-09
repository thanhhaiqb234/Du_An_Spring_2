package com.example.demo.controller;

import com.example.demo.model.Brand;
import com.example.demo.service.IBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/public/brand")
public class BrandController {
    @Autowired
    private IBrandService iBrandService;
    @GetMapping("")
    public ResponseEntity<List<Brand>> getAllBrand(){
        return  new ResponseEntity<>( iBrandService.findAll(), HttpStatus.OK);
    }
}
