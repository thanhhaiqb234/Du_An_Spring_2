package com.example.demo.service.impl;

import com.example.demo.model.Product;
import com.example.demo.repository.IProductRepository;
import com.example.demo.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public List<Product> findProductSale(Integer page) {

        return iProductRepository.findProductSale(page);
    }

    @Override
    public List<Product> findProductHome() {
        return iProductRepository.findAllProductHome();
    }

    @Override
    public Page<Product> findAllByNameProductContaining(String name, Pageable pageable) {
        return iProductRepository.findAllByNameProductContaining(name, pageable);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return iProductRepository.findAll(pageable);
    }

    @Override
    public Page<Product> findProductByProductTypeId(Pageable pageable, Integer id) {
        return iProductRepository.findByProductType_Id(pageable, id);
    }

    @Override
    public Product findProductById(Integer id) {
        return iProductRepository.findProductById(id);
    }


    @Override
    public List<Product> findByBrand_Id(Integer id) {
        return iProductRepository.findByBrand_Id(id);
    }

    @Override
    public List<Product> findProductByIdBrand(Integer id, Integer page) {
        return iProductRepository.findProductByIdBrand(id, page);
    }

    @Override
    public void updateQuantityProductById(int quantity, int idProduct) {
        iProductRepository.updateQuantityProductById(quantity, idProduct);
    }

    @Override
    public Page<Product> findProductByAllField(Pageable pageable, String name, String  idType, String idBrand, String  idColor, String  idSize, Double  priceStart, Double  priceEnd) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetween
                (pageable,name,idType,idBrand,idColor,idSize,priceStart,priceEnd);
    }

    @Override
    public Page<Product> findProductByField(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContaining
                (pageable,name,idType,idBrand,idColor,idSize);
    }

    @Override
    public Page<Product> sortProductByPrice(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByPrice
                (pageable,name,idType,idBrand,idColor,idSize);
    }

    @Override
    public Page<Product> sortProductByPriceDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByPriceDesc
                (pageable,name,idType,idBrand,idColor,idSize);
    }

    @Override
    public Page<Product> sortProductByNameDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByNameProductDesc
                (pageable,name,idType,idBrand,idColor,idSize);
    }

    @Override
    public Page<Product> sortProductByName(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByNameProduct
                (pageable,name,idType,idBrand,idColor,idSize);
    }

    @Override
    public Page<Product> sortProductByPrice(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByPrice
                (pageable,name,idType,idBrand,idColor,idSize,priceStart,priceEnd);
    }

    @Override
    public Page<Product> sortProductByPriceDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByPriceDesc
                (pageable,name,idType,idBrand,idColor,idSize,priceStart,priceEnd);
    }

    @Override
    public Page<Product> sortProductByNameDesc(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByNameProductDesc
                (pageable,name,idType,idBrand,idColor,idSize,priceStart,priceEnd);
    }

    @Override
    public Page<Product> sortProductByName(Pageable pageable, String name, String idType, String idBrand, String idColor, String idSize, Double priceStart, Double priceEnd) {
        return iProductRepository.findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByNameProduct
                (pageable,name,idType,idBrand,idColor,idSize,priceStart,priceEnd);
    }
}
