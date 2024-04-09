package com.example.demo.controller;

import com.example.demo.model.Account;
import com.example.demo.model.Cart;
import com.example.demo.model.Product;
import com.example.demo.security.jwt.JwtProvider;
import com.example.demo.service.IAccountService;
import com.example.demo.service.ICartService;
import com.example.demo.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class CartController {
    @Autowired
    private ICartService iCartService;
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private JwtProvider provider;

    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @GetMapping("/shopping-cart")
    public ResponseEntity<?> getCartByUser(HttpServletRequest httpServletRequest) {
        String header = httpServletRequest.getHeader("Authorization");
        String token = header.substring(7);
        String username = provider.getUserNameFromToken(token);
        Account account = iAccountService.findByEmail(username).get();
        List<Cart> cartList = iCartService.getAllByIdAccount(account.getId());
        if (cartList == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(cartList, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @PostMapping("/add-to-cart/{idProduct}")
    public ResponseEntity<?> addProductToCart(@PathVariable int idProduct) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            Account account = iAccountService.findByEmail(email).get();
            Product product = iProductService.findProductById(idProduct);
            Cart cart = iCartService.getCartByProductAndByAccount(account.getId(), product.getId());
            if (cart==null){
                iCartService.createCart(account, product, 1);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
            if (product.getQuantity() <= cart.getQuantity()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            iCartService.createCart(account, product, 1);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @PostMapping("/add-detail")
    public ResponseEntity<?> addProductToCartDetail(@RequestParam("id") int idProduct, @RequestParam("quantity") int num) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = iAccountService.findByEmail(email).get();
        Product product = iProductService.findProductById(idProduct);
        Cart oldCart = iCartService.getCartByProductAndByAccount(account.getId(), product.getId());
        if (product.getQuantity()<oldCart.getQuantity()+num) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (oldCart == null) {
            Cart cart = new Cart(num, product, account);
            iCartService.setCart(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            Cart cart = new Cart(oldCart.getId(), oldCart.getQuantity() + num, product, account);
            iCartService.setCart(cart);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @PostMapping("/minus/{idProduct}")
    public ResponseEntity<?> minusProductOnCart(@PathVariable int idProduct) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = iAccountService.findByEmail(email).get();
        Product product = iProductService.findProductById(idProduct);
        Cart oldCart = iCartService.getCartByProductAndByAccount(account.getId(), product.getId());
        if (oldCart == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            if (oldCart.getQuantity() > 1) {
                Cart cart = new Cart(oldCart.getId(), oldCart.getQuantity() - 1, product, account);
                iCartService.setCart(cart);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/cart-remove/{idProduct}")
    public ResponseEntity<?> deleteProductOnCart(@PathVariable Integer idProduct) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = iAccountService.findByEmail(email).get();
        Product product = iProductService.findProductById(idProduct);
        try {
            iCartService.deleteCartByIdProductAndAccount(account.getId(), product.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @GetMapping("/cart-item")
    public ResponseEntity<Integer> countTotalProductByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Account account = iAccountService.findByEmail(email).get();
        Integer totalItiem = iCartService.countTotalProductByAccount(account.getId());
        if (totalItiem == null) {
            totalItiem = 0;
        }
        return new ResponseEntity<>(totalItiem, HttpStatus.OK);

    }
}
