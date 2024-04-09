package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Integer> {

    @Query(nativeQuery = true,value = "select * from product order by date_import desc  limit 12")
    List<Product> findAllProductHome();
    Page<Product> findAll(Pageable pageable);
    @Query (nativeQuery = true,value = "select  * from product where id_discount between 2 and 5 limit :page")
    List<Product> findProductSale(Integer page);
    Page<Product> findAllByNameProductContaining(String name,Pageable pageable);
    Product findProductById(Integer id);

    List<Product> findByBrand_Id(Integer id);
    @Query(value = "select * from product where id_brand =:id limit :page ",nativeQuery = true)
    List<Product> findProductByIdBrand(@Param("id") Integer id, @Param("page") Integer page);

    @Modifying
    @Transactional
    @Query(value = "UPDATE product SET quantity = :quantity WHERE id = :idProduct", nativeQuery = true)
    void updateQuantityProductById(@Param("quantity") int quantity, @Param("idProduct") int idProduct);
     Page<Product>findByProductType_Id(Pageable pageable,Integer id);

     Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetween
             (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize,Double  priceStart,Double  priceEnd);

    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContaining
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize);

    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByPrice
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize,Double  priceStart,Double  priceEnd);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByPriceDesc
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize,Double  priceStart,Double  priceEnd);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByNameProduct
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize,Double  priceStart,Double  priceEnd);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingAndPriceBetweenOrderByNameProductDesc
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize,Double  priceStart,Double  priceEnd);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByPrice
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByPriceDesc
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByNameProduct
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize);
    Page<Product> findByNameProductContainingAndProductType_ProductTypeContainingAndBrand_NameBrandContainingAndColor_ColorContainingAndSize_SizeContainingOrderByNameProductDesc
            (Pageable pageable,String name,String  idType,String  idBrand,String  idColor,String  idSize);

}
