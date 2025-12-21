package com.eventmanagement.event.service;

import com.eventmanagement.event.dto.EventDTO;
import com.eventmanagement.event.model.Event;
import com.eventmanagement.event.model.EventStatus;
import com.eventmanagement.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;

    public EventDTO createEvent(EventDTO eventDTO) {
        Event event = new Event(
            eventDTO.getTitle(),
            eventDTO.getDescription(),
            eventDTO.getEventDate(),
            eventDTO.getLocation(),
            eventDTO.getTotalTickets(),
            eventDTO.getTicketPrice(),
            eventDTO.getOrganizerId(),
            eventDTO.getParticipants()
        );
        event.setStatus(eventDTO.getStatus() != null ? eventDTO.getStatus() : EventStatus.ACTIVE);
        
        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }

    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found"));
        return convertToDTO(event);
    }

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerId(organizerId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public EventDTO updateEvent(Long id, EventDTO eventDTO) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Event not found"));
        
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setEventDate(eventDTO.getEventDate());
        event.setLocation(eventDTO.getLocation());
        event.setTotalTickets(eventDTO.getTotalTickets());
        event.setTicketPrice(eventDTO.getTicketPrice());
        event.setParticipants(eventDTO.getParticipants());
        if (eventDTO.getStatus() != null) {
            event.setStatus(eventDTO.getStatus());
        }
        
        Event updatedEvent = eventRepository.save(event);
        return convertToDTO(updatedEvent);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    private EventDTO convertToDTO(Event event) {
        return new EventDTO(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getEventDate(),
            event.getLocation(),
            event.getTotalTickets(),
            event.getTicketPrice(),
            event.getOrganizerId(),
            event.getParticipants(),
            event.getStatus()
        );
    }
}






