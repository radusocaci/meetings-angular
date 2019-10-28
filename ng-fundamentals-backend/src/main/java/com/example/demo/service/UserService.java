package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> login(User user) {
        return userRepository.getUserByUserName(user.getUserName());
    }

    public void register(User user) {
        userRepository.save(user);
    }

    public void update(User user) {
        userRepository.save(user);
    }
}
