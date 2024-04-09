package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/public/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IImageService iImageService;
    @Autowired
    private IColorService iColorService;
    @Autowired
    private ISizeService iSizeService;
    @Autowired
    private IProductTypService iProductTypService;

//    @GetMapping("list-product")
//    public ResponseEntity<Page<Product>> getAllProduct(@PageableDefault(size = 9) Pageable pageable) {
//        if (iProductService.findAll(pageable) != null) {
//            return new ResponseEntity<>(iProductService.findAll(pageable), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//    }

    @GetMapping("/home-list")
    public ResponseEntity<List<Product>> findAll() {
        if (iProductService.findProductHome() != null) {
            return new ResponseEntity<>(iProductService.findProductHome(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/list-sale")
    public ResponseEntity<List<Product>> findAllSale(@RequestParam("page") String page) {
        Integer number = Integer.parseInt(page);
        if (iProductService.findProductSale(number) != null) {
            return new ResponseEntity<>(iProductService.findProductSale(number), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

    @GetMapping("image/{id}")
    public ResponseEntity<List<Image>> findImagesByProductId(@PathVariable("id") Integer id) {
        if (iImageService.findImageByIdProduct(id) != null) {
            return new ResponseEntity<>(iImageService.findImageByIdProduct(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("brand/{id}")
    public ResponseEntity<List<Product>> getProductByIdBrand(@PathVariable("id") Integer id) {
        if (iProductService.findByBrand_Id(id) != null) {
            return new ResponseEntity<>(iProductService.findByBrand_Id(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("all-brand/{id}/{page}")
    public ResponseEntity<List<Product>> getAllProductByIdBrand(@PathVariable("id") Integer id, @PathVariable("page") Integer page) {
        if (iProductService.findProductByIdBrand(id, page) != null) {
            return new ResponseEntity<>(iProductService.findProductByIdBrand(id, page), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable("id") Integer id) {
        if (iProductService.findProductById(id) != null) {
            return new ResponseEntity<>(iProductService.findProductById(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/search-sort")
    public ResponseEntity<Page<Product>> sortProduct(@PageableDefault(size = 9) Pageable pageable, @RequestParam("name") String name,
                                                        @RequestParam("type") String idType, @RequestParam("brand") String  idBrand,
                                                        @RequestParam("color") String  idColor, @RequestParam("size") String  idSize,
                                                        @RequestParam("priceStr") String  priceStart, @RequestParam("priceEnd") String  priceEnd,@RequestParam("code") String code) {
        Page<Product> productList = null;

        if (priceStart == "" && priceEnd == "") {
            switch (code) {
                case "0": {
                    productList = iProductService.findProductByField(pageable, name, idType, idBrand, idColor, idSize);
                    break;
                }
                case "1": {
                    productList = iProductService.sortProductByName(pageable, name, idType, idBrand, idColor, idSize);
                    break;
                }
                case "2": {
                    productList = iProductService.sortProductByNameDesc(pageable, name, idType, idBrand, idColor, idSize);
                    break;
                }
                case "3": {
                    productList = iProductService.sortProductByPrice(pageable, name, idType, idBrand, idColor, idSize);
                    break;
                }
                case "4": {
                    productList = iProductService.sortProductByPriceDesc(pageable, name, idType, idBrand, idColor, idSize);
                    break;
                }
            }
        } else {
            switch (code) {
                case "0": {
                    productList = iProductService.findProductByAllField(pageable, name, idType, idBrand, idColor, idSize,Double.parseDouble(priceStart),Double.parseDouble(priceEnd));
                    break;
                }
                case "1": {
                    productList = iProductService.sortProductByName(pageable, name, idType, idBrand, idColor, idSize,Double.parseDouble(priceStart),Double.parseDouble(priceEnd));
                    break;
                }
                case "2": {
                    productList = iProductService.sortProductByNameDesc(pageable, name, idType, idBrand, idColor, idSize,Double.parseDouble(priceStart),Double.parseDouble(priceEnd));
                    break;
                }
                case "3": {
                    productList = iProductService.sortProductByPrice(pageable, name, idType, idBrand, idColor, idSize,Double.parseDouble(priceStart),Double.parseDouble(priceEnd));
                    break;
                }
                case "4": {
                    productList = iProductService.sortProductByPriceDesc(pageable, name, idType, idBrand, idColor, idSize,Double.parseDouble(priceStart),Double.parseDouble(priceEnd));
                    break;
                }

            }
        }
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchByName(@PageableDefault(size = 9) Pageable pageable, @RequestParam(name = "name") String name) {
        if (iProductService.findAllByNameProductContaining(name, pageable) != null) {
            return new ResponseEntity<>(iProductService.findAllByNameProductContaining(name, pageable), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/color")
    public ResponseEntity<List<Color>> getAllColor() {
        if (iColorService.finAll() != null) {
            return new ResponseEntity<>(iColorService.finAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/size")
    public ResponseEntity<List<Size>> getAllSize() {
        if (iSizeService.findAll() != null) {
            return new ResponseEntity<>(iSizeService.findAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product-type")
    public ResponseEntity<List<ProductType>> getAllProductType() {
        if (iProductTypService.findAll() != null) {
            return new ResponseEntity<>(iProductTypService.findAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/type-product")
    public ResponseEntity<Page<Product>> getProductByIdProductType(@PageableDefault(size = 9) Pageable pageable,
                                                                   @RequestParam("type") Integer id) {
        if (iProductService.findProductByProductTypeId(pageable, id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(iProductService.findProductByProductTypeId(pageable, id), HttpStatus.OK);
        }
    }

//    @GetMapping("/search-pro")
//    public ResponseEntity<Page<Product>> getListProductByFields
//            (@PageableDefault(size = 9) Pageable pageable, @RequestParam("name") String name,
//             @RequestParam("type") String idType, @RequestParam("brand") String  idBrand,
//             @RequestParam("color") String  idColor, @RequestParam("size") String  idSize,
//             @RequestParam("priceStr") String  priceStart, @RequestParam("priceEnd") String  priceEnd) {
//        if (priceEnd=="" && priceStart =="") {
//            if (iProductService.findProductByField(pageable, name, idType, idBrand, idColor, idSize) == null) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//
//            } else {
//
//                return new ResponseEntity<>(iProductService.findProductByField(pageable, name, idType, idBrand, idColor, idSize), HttpStatus.OK);
//            }
//        } else {
//
//            if (iProductService.findProductByAllField(pageable, name, idType, idBrand, idColor, idSize, Double.parseDouble(priceStart), Double.parseDouble(priceEnd))
//                    == null) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            } else
//                return new ResponseEntity<>(iProductService.findProductByAllField(pageable, name, idType, idBrand, idColor,
//                        idSize, Double.parseDouble(priceStart), Double.parseDouble(priceEnd)), HttpStatus.OK);
//        }
//    }

}
