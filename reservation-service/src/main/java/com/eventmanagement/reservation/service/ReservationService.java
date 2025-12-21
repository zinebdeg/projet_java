package com.eventmanagement.reservation.service;

import com.eventmanagement.reservation.dto.ReservationDTO;
import com.eventmanagement.reservation.feign.EventDTO;
import com.eventmanagement.reservation.feign.EventServiceClient;
import com.eventmanagement.reservation.model.Reservation;
import com.eventmanagement.reservation.model.ReservationStatus;
import com.eventmanagement.reservation.repository.ReservationRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private EventServiceClient eventServiceClient;

    @CircuitBreaker(name = "eventService", fallbackMethod = "fallbackCreateReservation")
    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        // Vérifier que l'utilisateur ne réserve pas plus de 4 tickets
        if (reservationDTO.getNumberOfTickets() > 4) {
            throw new RuntimeException("Cannot reserve more than 4 tickets");
        }

        // Vérifier la disponibilité des tickets via le service événement
        EventDTO event = eventServiceClient.getEventById(reservationDTO.getEventId());
        
        // Compter les tickets déjà réservés
        Integer reservedTickets = reservationRepository.countReservedTicketsByEventId(reservationDTO.getEventId());
        Integer availableTickets = event.getTotalTickets() - reservedTickets;
        
        if (reservationDTO.getNumberOfTickets() > availableTickets) {
            throw new RuntimeException("Not enough tickets available");
        }

        Reservation reservation = new Reservation(
            reservationDTO.getEventId(),
            reservationDTO.getUserId(),
            reservationDTO.getNumberOfTickets()
        );
        reservation.setStatus(ReservationStatus.PENDING);
        
        Reservation savedReservation = reservationRepository.save(reservation);
        return convertToDTO(savedReservation);
    }

    public ReservationDTO fallbackCreateReservation(ReservationDTO reservationDTO, Exception ex) {
        throw new RuntimeException("Event service unavailable. Please try again later.");
    }

    public ReservationDTO getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
        return convertToDTO(reservation);
    }

    public List<ReservationDTO> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<ReservationDTO> getReservationsByEvent(Long eventId) {
        return reservationRepository.findByEventId(eventId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public ReservationDTO confirmReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.setStatus(ReservationStatus.CONFIRMED);
        Reservation updatedReservation = reservationRepository.save(reservation);
        return convertToDTO(updatedReservation);
    }

    public ReservationDTO cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.setStatus(ReservationStatus.CANCELLED);
        Reservation updatedReservation = reservationRepository.save(reservation);
        return convertToDTO(updatedReservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        return new ReservationDTO(
            reservation.getId(),
            reservation.getEventId(),
            reservation.getUserId(),
            reservation.getNumberOfTickets(),
            reservation.getReservationDate(),
            reservation.getStatus()
        );
    }
}






