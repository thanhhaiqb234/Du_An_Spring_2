package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Discount {
    @Id
    @Column(name = "id_discount")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Double percent;


    public Discount(Integer id, Double percent) {
        this.id = id;
        this.percent = percent;
    }

    public Discount() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getPercent() {
        return percent;
    }

    public void setPercent(Double percent) {
        this.percent = percent;
    }
}
