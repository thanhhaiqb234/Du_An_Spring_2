package com.example.demo.service.impl;

import com.example.demo.model.Account;
import com.example.demo.model.User;
import com.example.demo.repository.IAccountRepository;
import com.example.demo.service.IAccountService;
import com.example.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Optional;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IAccountRepository iAccountRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<Account> findByEmail(String email) {
        return iAccountRepository.findByEmail(email).isPresent() ? Optional.of(iAccountRepository.findByEmail(email).get()) : null;
    }

    @Override
    public Boolean existsAccountByEmail(String email) {
        return iAccountRepository.existsAccountByEmail(email);
    }

    @Override
    public Account save(Account account) {
        return iAccountRepository.save(account);
    }

    @Transactional
    @Override
    public void editUser(Account account) {
        iAccountRepository.save(account);
    }

    @Override
    public Account findById(Integer id) {
        return iAccountRepository.findById(id).get();
    }

//    @Override
//    public void saveNewPassword(Account account) {
//        Account newAccount = findById(account.getId());
//        String password = passwordEncoder.encode(account.getPassword());
//        newAccount.setPassword(password);
//        iAccountRepository.saveNewPassword(account.getId(), account.getPassword());
//    }

//    @Override
//    public void sendVerificationEmail(Account account, String siteURL) throws MessagingException, UnsupportedEncodingException {
//        String toAddress = account.getEmail();
//        User user = userService.getUser(toAddress);
//        String fromAddress = "namhung024@gmail.com";
//        String senderName = "YT-Sneaker";
//        String subject = "XÁC NHẬN EMAIL ĐĂNG KÍ TÀI KHOẢN";
//        String content = "\n" +
//                "<body >\n" +
//                "<table style=\"background: url('https://firebasestorage.googleapis.com/v0/b/chat-messenger-air.appspot.com/o/images%2FIMG_5704.jpg?alt=media&token=13a74a6f-2ca8-4ef3-86d2-ff2dcbefc8d4') no-repeat center center;background-size: cover;\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"800\">\n" +
//                "    <tr>\n" +
//                "        <td style=\"width: 50px;padding-left: 70px;padding-top: 20px\">\n" +
//                "            <img src=\"https://firebasestorage.googleapis.com/v0/b/chat-messenger-air.appspot.com/o/images%2FYH.png?alt=media&token=12209efc-1993-4e63-9fd4-86cbe9e4479c\" style=\"border-radius: 100%;width: 100px;\"></td>\n" +
//                "        <td><span style=\"float: left;padding-left: 10px; font-size: 60px;line-height: 1;font-weight: 700;letter-spacing: 2px;text-transform: uppercase;\n" +
//                "    color: #ffffff\">YanHua<span style=\"color: #ffc451\">.</span></span>\n" +
//                "        </td>\n" +
//                "    </tr>\n" +
//                "    <tr>\n" +
//                "        <td></td>\n" +
//                "        <td>\n" +
//                "            <p style=\"color: #ffffff;padding-top: 0\">Chào bạn <span style=\"color: #ffc451;font-size: 14px;font-weight: bold; text-transform: capitalize;\">&nbsp;" + user.getUsername() + "</span></p>\n" +
//                "            <p style=\"color: #ffffff\">\n" +
//                "                Chúng tôi xin chân thành cảm ơn bạn đã đăng ký tài khoản tại <span style=\"padding-left: 5px; font-size: 20px;font-weight: 700;text-transform: uppercase;\n" +
//                "    color: #ffffff\">YanHua<span style=\"color: #ffc451\">.</span></span> &nbsp; Để hoàn tất quá trình đăng ký và\n" +
//                "                đảm bảo tính bảo mật của tài khoản, vui lòng xác nhận địa chỉ email của bạn bằng cách nhấp vào liên kết\n" +
//                "                dưới đây:\n" +
//                "            </p>\n" +
//                "        <br>";
//        String verifyURL = "http://" + siteURL + "/verify/" + account.getVerificationCode();
//        content += "<button style=\"text-transform: uppercase;background-color:  #ffc451;border: none; color: #ffffff;padding: 16px 32px;text-align: center;text-decoration: none;\n" +
//                "             display: inline-block;font-size: 16px; margin: 4px 2px;justify-content: center;transition-duration: 0.4s; cursor: pointer; border-radius: 10px\">\n" +
//                "                <a href=\"" + verifyURL + "\">Xác nhận</a></button>";
//        content += "<p style=\"font-style: italic; color: #ffffff;font-size: 14px\"> Xin lưu ý rằng liên kết xác nhận này sẽ chỉ có hiệu lực trong vòng 24 giờ kể từ khi bạn nhận được email\n" +
//                "                này. Sau khi xác nhận thành công, bạn có thể tiếp tục sử dụng tài khoản của mình và truy cập vào tất cả\n" +
//                "                các tính năng của website.\n" +
//                "                Nếu bạn không thực hiện yêu cầu xác nhận này, vui lòng bỏ qua email này.</p>\n" +
//                "        </td>\n" +
//                "</table>\n" +
//                "</body>";
//
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message);
//
//        helper.setFrom(fromAddress, senderName);
//        helper.setTo(toAddress);
//        helper.setSubject(subject);
//        helper.setText(content, true);
//        mailSender.send(message);
//
//    }
//
//    @Override
//    public boolean verify(String verificationCode) {
////        Customer customer = customerRepo.findByVerificationCode(verificationCode);
////        Calendar cal = Calendar.getInstance();
////        if (customer == null) {
////            return false;
////        }else {
//////            customer.setVerificationCode(null);
////            customer.setEnabled(true);
////            customer.setExpiryDate(null);
////            customerRepo.save(customer);
////            return true;
////        }
////    }
//        return false;
//    }
}
