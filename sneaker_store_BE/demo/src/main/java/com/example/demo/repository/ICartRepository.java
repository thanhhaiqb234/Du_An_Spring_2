package com.example.demo.repository;

import com.example.demo.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ICartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findAllByAccount_Id(Integer id);

    @Query(value = "select * from cart where id_product = :idProduct and id_account = :idAccount", nativeQuery = true)
    Cart getCartToCreate(@Param("idProduct") Integer idProduct, @Param("idAccount") Integer idAccount);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart WHERE id_account = :id", nativeQuery = true)
    void deleteCartByIdAccount(@Param("id") Integer id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM sneaker_store.cart  WHERE id_account =:idAccount and id_product =:idProduct", nativeQuery = true)
    void deleteProductOnCart(@Param("idAccount") Integer idAccount, @Param("idProduct") Integer idProduct);

    @Query(value = "SELECT count(*) FROM cart \n" + "where id_account = :idAccount", nativeQuery = true)
    Integer countTotalProductByAccount(@Param("idAccount") int idUser);
}
