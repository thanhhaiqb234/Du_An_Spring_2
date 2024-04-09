package com.example.demo.controller;

import com.example.demo.model.Account;
import com.example.demo.model.Role;
import com.example.demo.security.jwt.JwtProvider;
import com.example.demo.security.reponse.ErrorMessage;
import com.example.demo.security.reponse.JwtResponse;
import com.example.demo.security.reponse.ResponseMessage;
import com.example.demo.security.request.SignInForm;
import com.example.demo.security.request.SignUpForm;
import com.example.demo.security.userPrincipal.UserPrinciple;
import com.example.demo.service.IAccountService;
import com.example.demo.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class AccountController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IRoleService roleService;
    @Autowired
   private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignUpForm signUpForm) {
        if (accountService.existsAccountByEmail(signUpForm.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("The email existed !!, Try again"), HttpStatus.OK);
        }
        Account users = new Account(signUpForm.getUsername(), passwordEncoder.encode(signUpForm.getPassword()));
        Set<String> strRoles = signUpForm.getRoles();
        Set<Role> roles = new HashSet<>();
        strRoles.forEach(role -> {
            switch (role) {
                case "admin":
                    Role adminRole = roleService.findByRole("ROLE_ADMIN").get();
                    roles.add(adminRole);
                    break;
                default:
                    Role userRole = roleService.findByRole("ROLE_USER").get();
                    roles.add(userRole);
            }
        });
        users.setRoleAccount(roles);
        System.out.println(users);
        Account accountUser = accountService.save(users);
        if (accountUser != null) {
            return new ResponseEntity<>(new ResponseMessage("Create user success!!!"), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new ResponseMessage("Create user failed!!!"), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody SignInForm signInForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ErrorMessage> errorMessages = new ArrayList<>();
            bindingResult
                    .getFieldErrors()
                    .stream()
                    .forEach(f -> errorMessages.add(new ErrorMessage(f.getField(), f.getDefaultMessage())));
            return new ResponseEntity<>(errorMessages, HttpStatus.BAD_REQUEST);
        }
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // tạo token trả về client
        String token = jwtProvider.createToken(authentication);
        // lấy quyền
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return new ResponseEntity<>(new JwtResponse(token, userPrinciple.getUsername(), userPrinciple.getAuthorities().toArray()[0].toString()), HttpStatus.OK);
    }

}

