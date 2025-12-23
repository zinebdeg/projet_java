package com.eventmanagement.event.service;

import com.eventmanagement.event.model.EventStatus;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class EventDTO {
    private Long id;

    // @NotBlank
    private String title;

    // @NotBlank
    private String description;

    // @NotNull
    private LocalDateTime eventDate;

    // @NotBlank
    private String location;

    // @NotNull
    // @Positive
    private Integer totalTickets;

    // @NotNull
    // @Positive
    private Double ticketPrice;

    // @NotNull
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

    // ... (les getters et setters restent inchangés)
}