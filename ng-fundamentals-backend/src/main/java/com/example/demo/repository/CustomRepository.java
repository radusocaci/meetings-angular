package com.example.demo.repository;

import com.example.demo.entity.Event;

public interface CustomRepository {
    Event getSessionByName(String session);
}
