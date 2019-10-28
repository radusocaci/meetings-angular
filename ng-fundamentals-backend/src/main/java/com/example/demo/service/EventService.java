package com.example.demo.service;

import com.example.demo.entity.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public void save(Event event) {
        eventRepository.save(event);
    }

    public Optional<Event> find(String eventId) {
        return eventRepository.findById(eventId);
    }

    public List<Event> findBySessionName(String sessionName) {
        return eventRepository.findBySessionName(sessionName);
    }

    public Event getSessionByName(String sessionName) {
        return eventRepository.getSessionByName(sessionName);
    }
}
