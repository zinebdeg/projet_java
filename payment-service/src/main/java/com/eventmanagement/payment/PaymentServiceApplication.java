package com.eventmanagement.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
@RequestMapping("/api/payments")
public class PaymentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentServiceApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "PAYMENT-SERVICE",
                "timestamp", new Date()
        );
    }

    @GetMapping("/test")
    public String test() {
        return "Payment Service is working!";
    }

    @PostMapping("/process")
    public Map<String, Object> processPayment(@RequestBody Map<String, Object> paymentRequest) {
        String paymentId = "PAY-" + System.currentTimeMillis();
        return Map.of(
                "message", "Payment processed successfully",
                "paymentId", paymentId,
                "status", "COMPLETED",
                "transactionDate", new Date().toString(),
                "amount", paymentRequest.get("amount")
        );
    }
}