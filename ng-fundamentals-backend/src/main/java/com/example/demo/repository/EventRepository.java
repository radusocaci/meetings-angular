package com.example.demo.repository;

import com.example.demo.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String>, CustomRepository {
    @Query(value = "{ 'sessions' : { $elemMatch: { 'name' : {$regex : ?0, $options: 'i'}} } } }")
    List<Event> findBySessionName(String sessionName);
}
