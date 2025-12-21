package com.eventmanagement.event.dto;

import com.eventmanagement.event.model.EventStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public class EventDTO {
    private Long id;
    
    @NotBlank
    private String title;
    
    @NotBlank
    private String description;
    
    @NotNull
    private LocalDateTime eventDate;
    
    @NotBlank
    private String location;
    
    @NotNull
    @Positive
    private Integer totalTickets;
    
    @NotNull
    @Positive
    private Double ticketPrice;
    
    @NotNull
    private Long organizerId;
    
    private String participants;
    
    private EventStatus status;

    public EventDTO() {}

    public EventDTO(Long id, String title, String description, LocalDateTime eventDate, 
                    String location, Integer totalTickets, Double ticketPrice, 
                    Long organizerId, String participants, EventStatus status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.location = location;
        this.totalTickets = totalTickets;
        this.ticketPrice = ticketPrice;
        this.organizerId = organizerId;
        this.participants = participants;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(Integer totalTickets) {
        this.totalTickets = totalTickets;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Long getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(Long organizerId) {
        this.organizerId = organizerId;
    }

    public String getParticipants() {
        return participants;
    }

    public void setParticipants(String participants) {
        this.participants = participants;
    }

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }
}






