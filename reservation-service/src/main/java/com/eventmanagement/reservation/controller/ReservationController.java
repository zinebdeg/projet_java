package com.eventmanagement.reservation.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private Map<String, Map<String, Object>> reservations = new ConcurrentHashMap<>();

    public ReservationController() {
        // Données de test en mémoire
        addSampleReservations();
    }

    private void addSampleReservations() {
        String id1 = "RES-" + System.currentTimeMillis() + "-001";
        reservations.put(id1, Map.of(
                "id", id1,
                "userId", 1L,
                "eventId", 1L,
                "ticketCount", 2,
                "totalPrice", 100.0,
                "status", "CONFIRMED",
                "reservationDate", new Date(),
                "createdAt", new Date()
        ));

        String id2 = "RES-" + System.currentTimeMillis() + "-002";
        reservations.put(id2, Map.of(
                "id", id2,
                "userId", 2L,
                "eventId", 2L,
                "ticketCount", 1,
                "totalPrice", 0.0,
                "status", "CONFIRMED",
                "reservationDate", new Date(),
                "createdAt", new Date()
        ));
    }

    // Endpoint de santé
    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "RESERVATION-SERVICE",
                "timestamp", new Date(),
                "reservationCount", reservations.size()
        );
    }

    // Test endpoint
    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("message", "Reservation Service is working!", "timestamp", new Date().toString());
    }

    // Créer une réservation
    @PostMapping("/")
    public Map<String, Object> createReservation(@RequestBody Map<String, Object> reservationRequest) {
        String reservationId = "RES-" + System.currentTimeMillis() + "-" +
                (int)(Math.random() * 1000);

        Map<String, Object> reservation = new HashMap<>(reservationRequest);
        reservation.put("id", reservationId);
        reservation.put("status", "CONFIRMED");
        reservation.put("reservationDate", new Date());
        reservation.put("createdAt", new Date());

        reservations.put(reservationId, reservation);

        return Map.of(
                "message", "Reservation created successfully",
                "reservationId", reservationId,
                "status", "CONFIRMED",
                "reservation", reservation
        );
    }

    // Récupérer toutes les réservations
    @GetMapping("/")
    public List<Map<String, Object>> getAllReservations() {
        return new ArrayList<>(reservations.values());
    }

    // Récupérer les réservations d'un utilisateur
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getReservationsByUser(@PathVariable Long userId) {
        return reservations.values().stream()
                .filter(reservation -> userId.equals(reservation.get("userId")))
                .toList();
    }

    // Confirmer une réservation
    @PutMapping("/{id}/confirm")
    public Map<String, Object> confirmReservation(@PathVariable String id) {
        if (reservations.containsKey(id)) {
            Map<String, Object> reservation = new HashMap<>(reservations.get(id));
            reservation.put("status", "CONFIRMED");
            reservation.put("confirmedAt", new Date());
            reservations.put(id, reservation);
            return Map.of("message", "Reservation confirmed", "reservation", reservation);
        }
        return Map.of("error", "Reservation not found", "id", id);
    }
}