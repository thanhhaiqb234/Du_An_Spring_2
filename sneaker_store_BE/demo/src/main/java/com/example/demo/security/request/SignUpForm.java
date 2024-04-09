package com.example.demo.security.request;

//import jdk.nashorn.internal.runtime.regexp.joni.Regex;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class SignUpForm {
    @NotBlank(message = "Không đuợc để trống")
    @Email(message = "Không đúng định dạng")
    @Size(max = 50,message = "Không quá  50 kí tự")
    private String username;
    @NotBlank(message = "Không được để trống")

    private String password;
    private Set<String> roles;

    public SignUpForm() {
    }

    public SignUpForm(String username, String password, Set<String> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}