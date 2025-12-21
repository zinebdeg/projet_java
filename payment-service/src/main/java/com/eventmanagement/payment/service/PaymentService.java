package com.eventmanagement.payment.service;

import com.eventmanagement.payment.dto.PaymentDTO;
import com.eventmanagement.payment.feign.EventDTO;
import com.eventmanagement.payment.feign.EventServiceClient;
import com.eventmanagement.payment.feign.ReservationDTO;
import com.eventmanagement.payment.feign.ReservationServiceClient;
import com.eventmanagement.payment.model.Payment;
import com.eventmanagement.payment.model.PaymentStatus;
import com.eventmanagement.payment.repository.PaymentRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private ReservationServiceClient reservationServiceClient;
    
    @Autowired
    private EventServiceClient eventServiceClient;

    @CircuitBreaker(name = "reservationService", fallbackMethod = "fallbackProcessPayment")
    public PaymentDTO processPayment(PaymentDTO paymentDTO) {
        // Récupérer la réservation
        ReservationDTO reservation = reservationServiceClient.getReservationById(paymentDTO.getReservationId());
        
        // Récupérer l'événement pour obtenir le prix du ticket
        EventDTO event = eventServiceClient.getEventById(reservation.getEventId());
        
        // Calculer le montant total automatiquement
        Double calculatedAmount = event.getTicketPrice() * reservation.getNumberOfTickets();
        
        // Créer le paiement
        Payment payment = new Payment(
            paymentDTO.getReservationId(),
            paymentDTO.getUserId(),
            calculatedAmount
        );
        
        // Simuler le paiement (succès ou échec aléatoire pour la démo)
        Random random = new Random();
        boolean paymentSuccess = random.nextDouble() > 0.2; // 80% de chance de succès
        
        payment.setStatus(paymentSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
        
        Payment savedPayment = paymentRepository.save(payment);
        return convertToDTO(savedPayment);
    }

    public PaymentDTO fallbackProcessPayment(PaymentDTO paymentDTO, Exception ex) {
        throw new RuntimeException("Reservation service unavailable. Please try again later.");
    }

    public PaymentDTO getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
        return convertToDTO(payment);
    }

    public List<PaymentDTO> getPaymentsByUser(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<PaymentDTO> getPaymentsByReservation(Long reservationId) {
        return paymentRepository.findByReservationId(reservationId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private PaymentDTO convertToDTO(Payment payment) {
        return new PaymentDTO(
            payment.getId(),
            payment.getReservationId(),
            payment.getUserId(),
            payment.getAmount(),
            payment.getPaymentDate(),
            payment.getStatus()
        );
    }
}






