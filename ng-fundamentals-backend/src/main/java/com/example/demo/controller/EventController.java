package com.example.demo.controller;

import com.example.demo.entity.Event;
import com.example.demo.entity.Session;
import com.example.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.findAll();
    }

    @PostMapping
    public void addEvent(@RequestBody Event event) {
        eventService.save(event);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable("id") String eventId) {
        return eventService.find(eventId).orElseThrow(() -> {
            throw new IllegalArgumentException("Event not found!");
        });
    }

    @GetMapping("/sessions/search")
    public List<Event> getSessions(@RequestParam("search") String sessionName) {
        return eventService.findBySessionName(sessionName);
    }

    @GetMapping("/session/{session:[a-zA-Z ]*}")
    public Event getSession(@PathVariable("session") String sessionName) {
        return eventService.getSessionByName(sessionName);
    }

    @PostMapping("/{eventId}/sessions/{session:[a-zA-Z ]*}/voters/{voter}")
    public void addVoter(@PathVariable("eventId") String eventId, @PathVariable("session") String session, @PathVariable("voter") String voter) {
        Event event = eventService.find(eventId).get();
        Session eventSession = event.getSessions().stream().filter(s -> s.getName().equals(session)).collect(Collectors.toList()).get(0);
        eventSession.getVoters().add(voter);
        eventService.save(event);
    }

    @DeleteMapping("/{eventId}/sessions/{session:[a-zA-Z ]*}/voters/{voter}")
    public void deleteVoter(@PathVariable("eventId") String eventId, @PathVariable("session") String session, @PathVariable("voter") String voter) {
        Event event = eventService.find(eventId).get();
        Session eventSession = event.getSessions().stream().filter(s -> s.getName().equals(session)).collect(Collectors.toList()).get(0);
        eventSession.getVoters().remove(voter);
        eventService.save(event);
    }
}
