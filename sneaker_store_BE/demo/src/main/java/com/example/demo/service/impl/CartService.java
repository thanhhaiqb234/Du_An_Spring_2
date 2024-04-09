package com.example.demo.service.impl;

import com.example.demo.model.Account;
import com.example.demo.model.Cart;
import com.example.demo.model.Product;
import com.example.demo.repository.ICartRepository;
import com.example.demo.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository iCartRepository;

    @Override
    public List<Cart> getAllByIdAccount(Integer id) {
        return iCartRepository.findAllByAccount_Id(id);
    }

    @Override
    public void setCart(Cart cart) {
        iCartRepository.save(cart);
    }

    @Override
    public void createCart(Account account, Product product, Integer quantity) {
        Cart shoppingCart = iCartRepository.getCartToCreate(product.getId(), account.getId());
        if (shoppingCart == null) {
            Cart newShoppingCart = new Cart();
            newShoppingCart.setQuantity(quantity);
            newShoppingCart.setAccount(account);
            newShoppingCart.setProduct(product);
            iCartRepository.save(newShoppingCart);
        } else {
                shoppingCart.setQuantity(shoppingCart.getQuantity() + quantity);
                iCartRepository.save(shoppingCart);
        }
    }

    @Override
    public void deleteCartByIdProductAndAccount(Integer idAccount, Integer idProduct) {
        iCartRepository.deleteProductOnCart(idAccount,idProduct);
    }

    @Override
    public void deleteByIdAccount(Account account) {
        iCartRepository.deleteCartByIdAccount(account.getId());
    }

    @Override
    public Cart getCartByProductAndByAccount(Integer idAccount, Integer idProduct) {
        return iCartRepository.getCartToCreate(idProduct,idAccount);
    }

    @Override
    public Integer countTotalProductByAccount(int idAccount) {
        return iCartRepository.countTotalProductByAccount(idAccount);
    }


}
