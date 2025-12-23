package com.eventmanagement.payment.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private Map<String, Map<String, Object>> payments = new ConcurrentHashMap<>();

    public PaymentController() {
        // Données de test en mémoire
        addSamplePayments();
    }

    private void addSamplePayments() {
        String id1 = "PAY-" + System.currentTimeMillis() + "-001";
        payments.put(id1, Map.of(
                "id", id1,
                "userId", 1L,
                "eventId", 1L,
                "reservationId", "RES-001",
                "amount", 50.0,
                "currency", "EUR",
                "status", "COMPLETED",
                "paymentMethod", "CREDIT_CARD",
                "transactionDate", new Date(),
                "createdAt", new Date()
        ));

        String id2 = "PAY-" + System.currentTimeMillis() + "-002";
        payments.put(id2, Map.of(
                "id", id2,
                "userId", 2L,
                "eventId", 2L,
                "reservationId", "RES-002",
                "amount", 0.0,
                "currency", "EUR",
                "status", "COMPLETED",
                "paymentMethod", "FREE",
                "transactionDate", new Date(),
                "createdAt", new Date()
        ));
    }

    // Endpoint de santé
    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "PAYMENT-SERVICE",
                "timestamp", new Date(),
                "paymentCount", payments.size()
        );
    }

    // Test endpoint
    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("message", "Payment Service is working!", "timestamp", new Date().toString());
    }

    // Traiter un paiement
    @PostMapping("/process")
    public Map<String, Object> processPayment(@RequestBody Map<String, Object> paymentRequest) {
        String paymentId = "PAY-" + System.currentTimeMillis() + "-" +
                (int)(Math.random() * 1000);

        Map<String, Object> payment = new HashMap<>(paymentRequest);
        payment.put("id", paymentId);
        payment.put("status", "COMPLETED");
        payment.put("transactionDate", new Date());
        payment.put("createdAt", new Date());

        payments.put(paymentId, payment);

        return Map.of(
                "message", "Payment processed successfully",
                "paymentId", paymentId,
                "status", "COMPLETED",
                "transactionDate", new Date().toString()
        );
    }

    // Récupérer tous les paiements
    @GetMapping("/")
    public List<Map<String, Object>> getAllPayments() {
        return new ArrayList<>(payments.values());
    }

    // Récupérer les paiements d'un utilisateur
    @GetMapping("/user/{userId}")
    public List<Map<String, Object>> getPaymentsByUser(@PathVariable Long userId) {
        return payments.values().stream()
                .filter(payment -> userId.equals(payment.get("userId")))
                .toList();
    }
}