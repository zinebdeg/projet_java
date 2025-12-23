package com.eventmanagement.notification.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @GetMapping("/health")
    public String health() {
        return "Notification service is up and running!";
    }

    @GetMapping("/")
    public List<String> getAllNotifications() {
        return Arrays.asList(
                "Notification 1: Event created",
                "Notification 2: User registered",
                "Notification 3: Event updated"
        );
    }

    @PostMapping("/")
    public Map<String, String> sendNotification(@RequestBody Map<String, String> notification) {
        return Map.of(
                "status", "sent",
                "message", "Notification sent to " + notification.get("to"),
                "content", notification.get("content")
        );
    }
}