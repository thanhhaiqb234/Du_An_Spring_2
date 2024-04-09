package com.example.demo.security.userPrincipal;

import com.example.demo.model.Account;
import com.example.demo.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    private IAccountRepository accountRepository;

    @Override
    @Transactional
    //Từ thông tin account chuyển tất cả qua UserDetail
    public UserDetails loadUserByUsername(String username) {
        try {
            Account accountUser = accountRepository.findByEmail(username).get();
            return UserPrinciple.build(accountUser);
        } catch(UsernameNotFoundException e) {
            e.getMessage();
        }
        return null;
    }
}
