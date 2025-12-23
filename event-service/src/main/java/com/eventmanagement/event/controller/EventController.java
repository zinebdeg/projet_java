package com.eventmanagement.event.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private Map<Long, Map<String, Object>> events = new HashMap<>();
    private long currentId = 4L;

    public EventController() {
        // Données d'exemple
        events.put(1L, Map.of(
                "id", 1L,
                "title", "Concert de Rock",
                "description", "Un concert de rock incroyable",
                "date", "2024-03-15T20:00:00",
                "location", "Paris",
                "price", 50.0,
                "availableTickets", 100,
                "organizerId", 1L,
                "category", "MUSIC",
                "createdAt", new Date()
        ));
        events.put(2L, Map.of(
                "id", 2L,
                "title", "Conférence Tech",
                "description", "Conférence sur les dernières technologies",
                "date", "2024-04-10T09:00:00",
                "location", "Lyon",
                "price", 0.0,
                "availableTickets", 200,
                "organizerId", 2L,
                "category", "TECH",
                "createdAt", new Date()
        ));
        events.put(3L, Map.of(
                "id", 3L,
                "title", "Festival de Jazz",
                "description", "Festival de jazz avec des artistes internationaux",
                "date", "2024-05-20T18:00:00",
                "location", "Parc de la Tête d'Or, Lyon",
                "price", 30.0,
                "availableTickets", 500,
                "organizerId", 1L,
                "category", "MUSIC",
                "createdAt", new Date()
        ));
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "EVENT-SERVICE",
                "timestamp", new Date(),
                "eventCount", events.size()
        );
    }

    @GetMapping("/")
    public List<Map<String, Object>> getAllEvents() {
        return new ArrayList<>(events.values());
    }

    @GetMapping("/{id}")
    public Map<String, Object> getEventById(@PathVariable Long id) {
        if (events.containsKey(id)) {
            return events.get(id);
        }
        return Map.of("error", "Event not found", "id", id);
    }

    @PostMapping("/")
    public Map<String, Object> createEvent(@RequestBody Map<String, Object> eventRequest) {
        long id = currentId++;
        Map<String, Object> newEvent = new HashMap<>(eventRequest);
        newEvent.put("id", id);
        newEvent.put("createdAt", new Date());
        events.put(id, newEvent);
        return Map.of(
                "message", "Event created successfully",
                "id", id,
                "event", newEvent
        );
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteEvent(@PathVariable Long id) {
        if (events.remove(id) != null) {
            return Map.of("message", "Event deleted successfully", "id", String.valueOf(id));
        }
        return Map.of("error", "Event not found", "id", String.valueOf(id));
    }
}