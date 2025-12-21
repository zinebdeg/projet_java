package com.eventmanagement.reservation.repository;

import com.eventmanagement.reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByEventId(Long eventId);
    
    @Query("SELECT COALESCE(SUM(r.numberOfTickets), 0) FROM Reservation r WHERE r.eventId = :eventId AND r.status = 'CONFIRMED'")
    Integer countReservedTicketsByEventId(@Param("eventId") Long eventId);
}






