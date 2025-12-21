package com.eventmanagement.reservation.dto;

import com.eventmanagement.reservation.model.ReservationStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Max;

import java.time.LocalDateTime;

public class ReservationDTO {
    private Long id;
    
    @NotNull
    private Long eventId;
    
    @NotNull
    private Long userId;
    
    @NotNull
    @Positive
    @Max(4)
    private Integer numberOfTickets;
    
    private LocalDateTime reservationDate;
    
    private ReservationStatus status;

    public ReservationDTO() {}

    public ReservationDTO(Long id, Long eventId, Long userId, Integer numberOfTickets, 
                         LocalDateTime reservationDate, ReservationStatus status) {
        this.id = id;
        this.eventId = eventId;
        this.userId = userId;
        this.numberOfTickets = numberOfTickets;
        this.reservationDate = reservationDate;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }
}






