package com.example.demo.repository;

import com.example.demo.entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class EventRepositoryImpl implements CustomRepository {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public EventRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Event getSessionByName(String session) {
        return mongoTemplate.findOne(new Query(Criteria.where("sessions").elemMatch(Criteria.where("name").is(session))), Event.class);
    }
}
