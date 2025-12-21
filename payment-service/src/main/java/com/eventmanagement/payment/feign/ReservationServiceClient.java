package com.eventmanagement.payment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "reservation-service")
public interface ReservationServiceClient {
    @GetMapping("/reservations/{id}")
    ReservationDTO getReservationById(@PathVariable("id") Long id);
}






