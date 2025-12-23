package com.eventmanagement.reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping("/api/reservations")
public class ReservationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReservationServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "RESERVATION-SERVICE",
                "timestamp", new Date()
        );
    }

    @GetMapping("/test")
    public String test() {
        return "Reservation Service is working!";
    }

    @PostMapping("/")
    public Map<String, Object> createReservation(@RequestBody Map<String, Object> reservationRequest) {
        String reservationId = "RES-" + System.currentTimeMillis();
        return Map.of(
                "message", "Reservation created successfully",
                "reservationId", reservationId,
                "status", "CONFIRMED",
                "reservationDate", new Date().toString(),
                "userId", reservationRequest.get("userId"),
                "eventId", reservationRequest.get("eventId")
        );
    }
}