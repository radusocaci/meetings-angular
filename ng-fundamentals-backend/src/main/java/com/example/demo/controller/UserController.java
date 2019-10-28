package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private User user;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public User loginUer(@RequestBody User user) {
        return user = userService.login(user)
                .orElseThrow(() -> {throw new RuntimeException("Unauthorized!");});
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody User user) {
        userService.register(user);
    }

    @GetMapping("/status")
    public User checkStatus() {
        if(user != null) {
            return user;
        } else {
            return null;
        }
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody User user) {
        userService.update(user);
    }
}
