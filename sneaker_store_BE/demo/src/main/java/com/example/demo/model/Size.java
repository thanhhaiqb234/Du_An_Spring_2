package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    private String size;


    public Size() {
    }

    public Size(Integer id, String size) {
        this.id = id;
        this.size = size;

    }

    public Integer getId() {
        return id;
    }

    public String getSize() {
        return size;
    }

}
