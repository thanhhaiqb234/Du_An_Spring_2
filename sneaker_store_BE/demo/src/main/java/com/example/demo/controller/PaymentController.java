package com.example.demo.controller;

import com.example.demo.config.VNPaymentConfig;
import com.example.demo.model.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user/vn-pay")
public class PaymentController {
    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private IOrderService orderService;

    @Autowired
    private IOrderDetailService orderDetailService;
    @Autowired
    private IProductService productService;

    //    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestParam long total)
            throws UnsupportedEncodingException {

        String orderType = "170000";
//        long amount = Integer.parseInt(req.getParameter("amount"))*100;
//        String bankCode = req.getParameter("bankCode");


        String amount = String.valueOf(total * 100);
//        String amount = "10000000";
        String vnp_TxnRef = VNPaymentConfig.getRandomNumber(8);
//        String vnp_IpAddr = Config.getIpAddress(req);
        String vnp_TmnCode = VNPaymentConfig.vnp_TmnCode;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPaymentConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPaymentConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
//        String locate = req.getParameter("language");
//        if (locate != null && !locate.isEmpty()) {
//            vnp_Params.put("vnp_Locale", locate);
//        } else {
//            vnp_Params.put("vnp_Locale", "vn");
//        }
        vnp_Params.put("vnp_ReturnUrl", VNPaymentConfig.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", "0:0:0:0:0:0:0:1");

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPaymentConfig.hmacSHA512(VNPaymentConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPaymentConfig.vnp_PayUrl + "?" + queryUrl;
        return new ResponseEntity<>(paymentUrl, HttpStatus.OK);
    }

//    @PreAuthorize("hasRole('ROLE_USER')  or hasRole('ROLE_ADMIN')")
    @PostMapping("/bought")
    public ResponseEntity<List<OrderDetail>> addOrder(@RequestParam("email") String email,
                                                      @RequestParam("name") String name,
                                                      @RequestParam("total") String money,
                                                      @RequestParam("address") String address,
                                                      @RequestParam ("phone")String numberPhone,
                                                      @RequestParam("note") String note) {
        try {
            Account account = iAccountService.findByEmail(email).get();
            Date date = new Date();
            System.out.println(date);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
            String formattedDate = dateFormat.format(date);
            List<Cart> listCart = cartService.getAllByIdAccount(account.getId());
            if (listCart.size()==0){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Order orderProduct = new Order(name,money,address, formattedDate,numberPhone, note, account);
            Order orderProduct1 = orderService.addOder(orderProduct);
            for (int i = 0; i < listCart.size(); i++) {
//                if (listCart.get(i).getProduct().getQuantity()==0){
//                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//                }
                OrderDetail orderDetail = new OrderDetail(listCart.get(i).getQuantity(), orderProduct1,
                        listCart.get(i).getProduct());
                orderDetailService.addOrderDetail(orderDetail);
                Product product = productService.findProductById(listCart.get(i).getProduct().getId());
                productService.updateQuantityProductById(product.getQuantity() - listCart.get(i).getQuantity(),
                        listCart.get(i).getProduct().getId());
            }
            cartService.deleteByIdAccount(account);
            List<OrderDetail> detailList =orderDetailService.findByOrder_Id(orderProduct.getId());
            return new ResponseEntity<>(detailList,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
