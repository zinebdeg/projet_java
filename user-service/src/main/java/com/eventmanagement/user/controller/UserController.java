package com.eventmanagement.user.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private Map<Long, Map<String, Object>> users = new HashMap<>();
    private long currentId = 3L;

    public UserController() {
        users.put(1L, Map.of(
                "id", 1L,
                "name", "John Doe",
                "email", "john@example.com",
                "role", "USER"
        ));
        users.put(2L, Map.of(
                "id", 2L,
                "name", "Jane Smith",
                "email", "jane@example.com",
                "role", "ORGANIZER"
        ));
    }

    @GetMapping("/health")
    public String health() {
        return "User service is up and running!";
    }

    @GetMapping("/")
    public List<Map<String, Object>> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    @GetMapping("/{id}")
    public Map<String, Object> getUserById(@PathVariable Long id) {
        if (users.containsKey(id)) {
            return users.get(id);
        }
        return Map.of("error", "User not found", "id", id);
    }

    @PostMapping("/")
    public Map<String, Object> createUser(@RequestBody Map<String, Object> userRequest) {
        long id = currentId++;
        Map<String, Object> newUser = new HashMap<>(userRequest);
        newUser.put("id", id);
        users.put(id, newUser);
        return Map.of(
                "message", "User created successfully",
                "id", id,
                "user", newUser
        );
    }
}